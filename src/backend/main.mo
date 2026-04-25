import NewsMixin "mixins/news-api";

actor {
  // Shared mutable cache state for news content
  let newsState = {
    var content : Text = "";
    var lastUpdated : Int = 0;
  };

  // OpenAI API key — set via setApiKey() by a canister controller
  let apiKeyState = {
    var key : Text = "REPLACE_WITH_YOUR_OPENAI_API_KEY";
  };

  include NewsMixin(newsState, apiKeyState);
};
