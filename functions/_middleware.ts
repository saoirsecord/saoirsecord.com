import proxyflare from "@flaregun-net/proxyflare-for-pages"

const routes: Route[] = [
  {
    from: {
      pattern: "saoirsecord.com/api/v1/accounts/lookup",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "https://mastodon.social/api/v1/accounts/lookup" },
  }
]

export const onRequestOptions: PagesFunction[] = [
  (context) => {
    let url = new URL(context.request.url);
    if (url.pathname == '/api/v1/accounts/lookup') {
      return new Response(null, { 
        "status": 200,
        "headers": {
          "Access-Control-Allow-Origin": "https://justmytoots.com",
          "Access-Control-Allow-Headers": "content-type"
        }
      }) 
    } else {
      try {
        return await context.next();
      } catch (err) {
        return new Response(`${err.message}\n${err.stack}`, { status: 500 });
      }
    }
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
