import proxyflare from "@flaregun-net/proxyflare-for-pages"

const routes: Route[] = [
  {
    from: {
      pattern: "saoirsecord.com/api/v1/accounts/lookup",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "https://mastodon.social/api/v1/accounts/lookup" },
  },
  {
    from: {
      pattern: "saoirsecord.com/api/v1/accounts/lookup?resource=acct:saoirsecord@saoirsecord.com",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "https://mastodon.social/api/v1/accounts/lookup?resource=acct:saoirsecord@saoirsecord.com" },
  }
]

export const onRequest: PagesFunction[] = [
  (context) =>
    proxyflare({
      config: {
        global: { debug: true },
        routes,
      },
    })(context)
]
