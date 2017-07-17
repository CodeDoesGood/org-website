<template>
  <section class="container">
    <br/>
    <div class="htmlContent">
      <h1>Title: {{ title }}</h1><br/>
      <div v-html="rawHtml"></div>
      <br/>
      <h2>Creator: {{ creator }}</h2>
      <h2>Last Updated: {{ last_updated }}</h2>
    </div>
  </section>
</template>

<script>
  import Endpoints from '~assets/endpoints';
  const client = new Endpoints();

  export default {
    layout: 'default',
    asyncData() {
      return client.editor.gatherById(2)
        .then(result => ({
          rawHtml: result.content.text,
          title: result.content.title,
          creator: result.content.created_by,
          last_updated: result.content.modified_date,
        }))
        .catch(() => ({ rawHtml: 'Unable to gather content' }));
    },
  };
</script>

<style>
  .htmlContent {
    margin: 0% 10% 1% 10%;
  }

</style>
