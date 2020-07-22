<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-textarea v-model="commitText" placeholder="填写 commit message" :rows="4" />
        <a-button @click="init">init</a-button>
        <a-button @click="add" v-if="addDisabled">add</a-button>
        <a-button @click="commit" v-if="commitDisabled">commit</a-button>
        <a-input placeholder="branch" v-model="branchText" />
        <a-button @click="branch">branch</a-button>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="15">
        <a-select default-value="main" style="width: 120px" @change="checkOut">
          <a-select-option v-for="item in branches" :key="item">{{item}}</a-select-option>
        </a-select>
        <div id="gitgraph"></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { createGitgraph, TemplateName, templateExtend } from "@gitgraph/js";
var branchHEAD;
var withoutAuthor = templateExtend(TemplateName.BlackArrow, {
  commit: {
    message: {
      displayHash: false,
      displayAuthor: false
    }
  }
});
var graphContainer, gitgraph;
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
      branchText: "",
      addDisabled: false,
      commitDisabled: false,
      branches: []
    };
  },
  methods: {
    init: function() {
      graphContainer = document.getElementById("gitgraph");
      graphContainer.innerHTML = "";
      gitgraph = createGitgraph(graphContainer, {
        template: withoutAuthor
      });
      branchHEAD = gitgraph.branch({
        name: "main"
      });
      this.refreshBranches();
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
    branch: function() {
      if (isNotNull(this.branchText)) {
        this.$message.error("必须填写分支。(branch text must be not null)");
        return;
      }
      branchHEAD = gitgraph.branch(this.branchText);
      this.refreshBranches();
    },
    zoom: function() {
      var graphContainer = document.getElementById("gitgraph");
      graphContainer.setAttribute("transform", "scale(" + 2 + ")");
    },
    checkOut: function(value) {
      if (isNotNull(value)) {
        this.$message.error(
          "必须选择有效分支。(select branch must be not null)"
        );
        return;
      }
      branchHEAD = gitgraph.branch(value);
    },
    refreshBranches: function() {
      this.branches = Array.from(gitgraph._graph.branches.keys());
      console.log(this.branches);
    }
  }
};
</script>