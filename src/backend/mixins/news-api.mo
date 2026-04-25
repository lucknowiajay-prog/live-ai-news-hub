import Time "mo:core/Time";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/news";
import NewsLib "../lib/news";

mixin (
  cachedContent : { var content : Text; var lastUpdated : Int },
  apiKey : { var key : Text },
) {
  /// Returns the cached AI-generated news content and the timestamp of last refresh.
  public query func getNews() : async Types.NewsResult {
    { content = cachedContent.content; lastUpdated = cachedContent.lastUpdated };
  };

  /// Triggers a fresh AI content fetch via HTTP outcalls and updates the cache.
  public func refreshNews() : async () {
    let now = Time.now();
    // Only refresh if cache is expired or empty
    if (cachedContent.lastUpdated == 0 or NewsLib.isExpired(cachedContent.lastUpdated, now)) {
      let url = "https://api.openai.com/v1/chat/completions";
      let body = NewsLib.buildPromptBody();
      let headers : [OutCall.Header] = [
        { name = "Authorization"; value = "Bearer " # apiKey.key },
        { name = "Content-Type"; value = "application/json" },
      ];
      let rawResponse = await OutCall.httpPostRequest(url, headers, body, transform);
      let content = NewsLib.extractContent(rawResponse);
      cachedContent.content := content;
      cachedContent.lastUpdated := now;
    };
  };

  /// Sets the OpenAI API key (admin only — caller must be a controller).
  public shared ({ caller }) func setApiKey(key : Text) : async () {
    if (not caller.isController()) {
      return; // silently reject non-controllers
    };
    apiKey.key := key;
  };

  /// IC-required transform callback for HTTP outcalls canonicalization.
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
