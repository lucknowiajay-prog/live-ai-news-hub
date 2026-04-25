module {
  /// Shared return type for getNews() — returned to frontend via query
  public type NewsResult = {
    content : Text;
    lastUpdated : Int;
  };
};
