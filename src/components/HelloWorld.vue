<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-button @click="init">init</a-button>
        <a-button @click="add" v-if="addDisabled">add</a-button>
        <a-textarea v-model="commitText" placeholder="Basic usage" :rows="4" />
        <a-button @click="commit" v-if="commitDisabled">commit</a-button>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="15">
        <div id="gitgraph"></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { createGitgraph, TemplateName, templateExtend } from "@gitgraph/js";
var branchHEAD;

function isNotNull(ele) {
  if (typeof ele === "undefined") {
    //先判断类型
    return true;
  } else if (ele == null) {
    return true;
  } else if (ele == "") {
    return true;
  }
  return false;
}
export default {
  data: function() {
    return {
      commitText: "",
      addDisabled: false,
      commitDisabled: false
    };
  },
  methods: {
    init: function() {
      var graphContainer = document.getElementById("gitgraph");
      graphContainer.innerHTML = "";
      var withoutAuthor = templateExtend(TemplateName.BlackArrow, {
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
      branchHEAD = gitgraph.branch({
        name: "main"
      });
      this.addDisabled = true;
      this.commitDisabled = true;
    },
    add: function() {},
    commit: function() {
      if (isNotNull(this.commitText)) {
        this.$message.error(
          "必须填写提交内容。(commit message must be not null)"
        );
        return;
      }
      branchHEAD.commit(this.commitText);
      this.commitText = null;
    },
    zoom: function() {
      var graphContainer = document.getElementById("gitgraph");
      graphContainer.setAttribute("transform", "scale(" + 2 + ")");
    }
  }
};
</script>