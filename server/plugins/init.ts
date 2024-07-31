import { NuxtRenderHTMLContext } from "nuxt/app";

function toggleColorScheme(html : NuxtRenderHTMLContext) {
    html.htmlAttrs.push('class="app-dark-mode"');
}
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
    //   console.log('render:html', html)
      toggleColorScheme(html)
    })

  })
  