<template>
  <div>
    <button v-on:click="init">init</button>
    <button v-on:click="add">add</button>
    <button v-on:click="commit">commit</button>
    <button v-on:click="branch">branch</button>
    <button v-on:click="branch">branch</button>
    <button v-on:click="branch">branch</button>
    <div id="gitgraph"></div>
  </div>
</template>

<script>
import { createGitgraph, TemplateName, templateExtend } from "@gitgraph/js";
export default {
  data: function() {
    return {};
  },
  methods: {
    greet: function() {
      const graphContainer = document.getElementById("gitgraph");
      var withoutAuthor = templateExtend(TemplateName.Metro, {
        commit: {
          message: {
            displayHash: false,
            displayAuthor: false
          }
        }
      });
      var gitgraph = createGitgraph(graphContainer, {
        template: withoutAuthor
      });
      const master = gitgraph.branch("master");
      master.commit("Init the project");
      master
        .commit("Add README")
        .commit("Add tests")
        .commit("Implement feature");
      master.tag("v1.0");
      const newFeature = gitgraph.branch("new-feature");
      newFeature.commit("Implement an awesome feature");
      master.commit("Hotfix a bug");
      newFeature.commit("Fix tests");
      // Merge `newFeature` into `master`
      master.merge(newFeature, "Release new version");
    }
  }
};
</script>