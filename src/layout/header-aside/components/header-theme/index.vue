<template>
  <div class="gotheme">
    <!-- <i class="fa fa-diamond" aria-hidden="true" @click="toggleVisible"></i> -->
    <i class="fa fa-magic" aria-hidden="true" @click="toggleVisible"></i>
    <div class="modal is-active" v-show="modelVisible">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">主题</p>
          <!-- <button class="delete" aria-label="close" @click="toggleVisible"></button> -->
          <span class="icon delete" @click="toggleVisible">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </header>
        <section class="modal-card-body">
          <div class="table-container">
            <table class="table is-bordered is-fullwidth">
              <tbody>
                <tr v-for="(theme,index) in themes" :key="index">
                  <td>{{theme.name}}</td>
                  <td style="width:20%;">
                    <figure class="image is-16by9">
                      <img :src="theme.preview" />
                    </figure>
                  </td>
                  <td>
                    <center>
                      <button v-if="theme.readOnly" class="button is-danger is-rounded">敬请期待</button>
                      <button v-else-if="currTheme===index" class="button is-success is-rounded">
                        <span class="icon is-small">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                        <span>已激活</span>
                      </button>
                      <button v-else class="button is-rounded">使用</button>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// import themeList from './components/d2-theme-list'
export default {
  components: {
    // 'd2-theme-list': themeList
  },
  data () {
    return {
      modelVisible: false,
      currTheme: 0
    }
  },
  computed: {
    themes () {
      return [
        {
          name: "经典",
          preview: "https://d2.pub/d2-admin/preview/image/theme/d2/preview@2x.png",
          readOnly: false
        },
        {
          name: "Dark",
          preview: "https://d2.pub/d2-admin/preview/image/theme/chester/preview@2x.png",
          readOnly: false
        },
        {
          name: "Light",
          preview: "https://d2.pub/d2-admin/preview/image/theme/element/preview@2x.png",
          readOnly: true
        },
        {
          name: "梦幻精灵🧚‍♀️",
          preview: "https://d2.pub/d2-admin/preview/image/theme/violet/preview@2x.png",
          readOnly: true
        }
      ]
    }
  },
  methods: {
    toggleVisible () {
      this.modelVisible = !this.modelVisible
    }
  }
}
</script>
<style lang="scss" scoped>
.gotheme {
  .table td img {
    max-height: initial;
  }
  .table td,
  .table th {
    text-align: center;
    vertical-align: middle;
  }

  .modal-card-head {
    border-bottom: initial;
    border-top-left-radius: initial;
    border-top-right-radius: initial;
    background-color: white;
  }

  .modal-card-body {
    padding: 0px 20px 20px 20px;
  }

  .modal-background {
    background: #000;
    opacity: 0.5;
  }
}
</style>