<template>
  <div>
    <a-button @click="init">init</a-button>
    <a-button @click="add">add</a-button>
    <a-button @click="commit">commit</a-button>
    <div id="gitgraph"></div>
  </div>
</template>

<script>
import { createGitgraph, TemplateName, templateExtend } from "@gitgraph/js";
var branchHEAD;
export default {
  data: function() {
    return {};
  },
  methods: {
    init: function() {
      var graphContainer = document.getElementById("gitgraph");
      graphContainer.innerHTML = "";
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
      branchHEAD = gitgraph.branch("main");
    },
    add: function() {},
    commit: function() {
      branchHEAD.commit("avvssdd");
    }
  }
};
</script>