import Types "../types/news";

module {
  /// Returns a placeholder NewsResult when no content has been cached yet
  public func emptyResult() : Types.NewsResult {
    {
      content = "";
      lastUpdated = 0;
    };
  };

  /// Checks whether the cached content has expired (older than 600 seconds)
  public func isExpired(lastUpdated : Int, now : Int) : Bool {
    let cacheNanos : Int = 600 * 1_000_000_000;
    now - lastUpdated > cacheNanos;
  };

  /// Builds the OpenAI chat-completion request body (JSON) for Hindi+Hinglish news
  public func buildPromptBody() : Text {
    let systemPrompt = "You are a Hindi+Hinglish AI news generator for an Indian live news website. "
      # "Generate realistic but clearly AI-generated content. Never give real financial advice. "
      # "Always present yourself as AI-generated content.";

    let userPrompt = "Generate a JSON object with exactly these 5 keys:\\n"
      # "1. goldRate: {india24k: string (e.g. Rs 1,54,000 per 10g), india22k: string, globalUSD: string (e.g. $2,380/oz), trend: string (arrow + short Hinglish)}\\n"
      # "2. weather: array of 5 objects {city, temp, condition} for Delhi, Mumbai, Chennai, Hyderabad, Jaipur — condition in Hinglish\\n"
      # "3. breakingNews: {india: [2-3 Hinglish bullets], usa: [2 Hinglish bullets], international: [2 Hinglish bullets]}\\n"
      # "4. futureTrends: array of 3-4 objects {topic: string, description: string in Hinglish}\\n"
      # "5. entertainment: [2-3 Hinglish fun/viral news bullets]\\n"
      # "Return ONLY valid JSON. All text in Hindi+Hinglish mix.";

    "{\"model\":\"gpt-4o\","
      # "\"messages\":["
      # "{\"role\":\"system\",\"content\":\"" # systemPrompt # "\"},"
      # "{\"role\":\"user\",\"content\":\"" # userPrompt # "\"}"
      # "],"
      # "\"max_tokens\":1500,"
      # "\"temperature\":0.7}";
  };

  /// Parses the raw OpenAI API response and extracts the generated JSON content.
  /// The OpenAI response contains the generated JSON inside choices[0].message.content.
  /// We tunnel the raw response to the frontend for full JSON parsing there.
  public func extractContent(rawResponse : Text) : Text {
    // The marker that precedes the model-generated content in the OpenAI response
    let startMarker = "\"content\":\"";
    // End marker that follows the content field value
    let endMarker = "\",\"refusal\"";

    // Split on start marker — first element is before content, second starts with content
    let afterStart = rawResponse.split(#text startMarker);
    var contentRaw = "";
    var passedFirst = false;
    for (seg in afterStart) {
      if (not passedFirst) {
        passedFirst := true;
        // skip — this is the text before the first "content":"
      } else if (contentRaw == "") {
        // This segment starts right after "content":"
        // Now trim at the end marker
        let beforeEnd = seg.split(#text endMarker);
        var isFirst = true;
        for (s in beforeEnd) {
          if (isFirst) {
            contentRaw := s;
            isFirst := false;
          };
        };
      };
    };

    if (contentRaw == "") {
      // Fallback: return raw response so frontend can handle it
      rawResponse
    } else {
      // Unescape JSON string escape sequences
      let unescaped = contentRaw
        .replace(#text "\\n", "\n")
        .replace(#text "\\\"", "\"")
        .replace(#text "\\/", "/")
        .replace(#text "\\\\", "\\");
      unescaped
    };
  };
};
