#!/bin/bash

# AiTutor Model Switcher Script
# Usage: ./switch-model.sh [model-name]

MODELS=(
    "openai/gpt-oss-20b:free"
    "qwen/qwen3-coder:free"
    "microsoft/phi-3-mini-128k-instruct:free"
    "meta-llama/llama-3.2-3b-instruct:free"
    "qwen/qwen-2.5-coder-32b-instruct"
    "openai/gpt-4o-mini"
)

if [ $# -eq 0 ]; then
    echo "Available models:"
    for i in "${!MODELS[@]}"; do
        echo "  $((i+1)). ${MODELS[$i]}"
    done
    echo ""
    echo "Usage: ./switch-model.sh [model-name]"
    echo "Example: ./switch-model.sh openai/gpt-oss-20b:free"
    exit 1
fi

MODEL="$1"

# Check if model exists in the list
if [[ " ${MODELS[@]} " =~ " ${MODEL} " ]]; then
    # Update .env file
    sed -i.bak "s/VITE_OPENROUTER_MODEL=.*/VITE_OPENROUTER_MODEL=${MODEL}/" .env
    echo "✅ Switched to model: ${MODEL}"
    echo "🔄 Please restart your development server for changes to take effect."
else
    echo "❌ Model '${MODEL}' not found in available models."
    echo "Available models:"
    for model in "${MODELS[@]}"; do
        echo "  - ${model}"
    done
fi
