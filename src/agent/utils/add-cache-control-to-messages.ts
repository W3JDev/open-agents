import type { ModelMessage, JSONValue, LanguageModel } from "ai";

function isAnthropicModel(model: LanguageModel): boolean {
  if (typeof model === "string") {
    return model.includes("anthropic") || model.includes("claude");
  }
  return (
    model.provider === "anthropic" ||
    model.provider.includes("anthropic") ||
    model.modelId.includes("anthropic") ||
    model.modelId.includes("claude")
  );
}

/**
 * Adds cache control to the last message in the array for optimal Anthropic cache hits.
 *
 * Per Anthropic's docs: "Mark the final block of the final message with cache_control
 * so the conversation can be incrementally cached. The system will automatically
 * lookup and use the longest previously cached sequence of blocks (up to 20 blocks)."
 *
 * This means you only need to mark the last message - not every message.
 * Only applies cache control when using an Anthropic model.
 *
 * @example
 * ```ts
 * prepareStep: ({ messages, model, ...rest }) => ({
 *   ...rest,
 *   messages: addCacheControlToMessages(messages, model),
 * }),
 * ```
 */
export function addCacheControlToMessages(
  messages: ModelMessage[],
  model: LanguageModel,
  providerOptions: Record<string, Record<string, JSONValue>> = {
    anthropic: { cacheControl: { type: "ephemeral" } },
  },
): ModelMessage[] {
  if (messages.length === 0) return messages;
  if (!isAnthropicModel(model)) return messages;

  return messages.map((message, index) => {
    if (index === messages.length - 1) {
      return {
        ...message,
        providerOptions: {
          ...message.providerOptions,
          ...providerOptions,
        },
      };
    }
    return message;
  });
}
