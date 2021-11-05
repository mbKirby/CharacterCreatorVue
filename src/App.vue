<template>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Character Creator</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
        rel="stylesheet"
      />
      <!-- DESCRIPTION REFERRER ROBOTS -->
      <meta name="description" content="Dnd character creator" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="robots" content="all" />

      <!-- OG, or Open Graph is Used by Many Crawlers to get Meta Data (facebook and others) -->
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Dnd character creator" />
      <meta property="og:description" content="Dnd character creator" />

      <!-- Open Graph Image (Preview Image on Fb and others) -->
      <meta
        property="og:image"
        content="https://scontent-iad3-1.xx.fbcdn.net/v/t1.6435-9/46275263_10156798625367673_4216319461193416704_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=cuw19atJ_QYAX_aAC2o&_nc_ht=scontent-iad3-1.xx&oh=e55b9bc2b7a6054c1d11b7401833e693&oe=61527397"
      />
      <!-- following content values are dimensions of image in px -->
      <meta property="og:image:width" content="[1050]" />
      <meta property="og:image:height" content="[630]" />
    </head>

    <div id="whole">
      <Navbar></Navbar>
      <router-view />
      <Footer></Footer>
    </div>
  </html>
</template>


<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap";
</style>
