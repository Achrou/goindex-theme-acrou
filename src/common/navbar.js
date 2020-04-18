import Vue from 'vue'

let navbar = Vue.component("navbar", {
    data: function () {
      return {};
    },
    template: `
              <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
                  <div class="container">
                      <div class="navbar-brand">
                          <a class="navbar-item" href="">
                              <h3 class="title is-3 has-text-white">Achirou's Cloud</h3>
                          </a>
                          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                              <span aria-hidden="true"></span>
                              <span aria-hidden="true"></span>
                              <span aria-hidden="true"></span>
                          </a>
                      </div>
                      <div class="navbar-menu">
                          <div class="navbar-start">
                          </div>
  
                          <div class="navbar-end">
                              <div class="navbar-item">
                                  <div class="field is-grouped">
                                      <p class="control has-icons-left has-icons-right">
                                          <input class="input is-rounded has-text-grey" type="text" placeholder="输入搜索关键词">
                                          <span class="icon is-small is-left">
                                              <i class="fas fa-search"></i>
                                          </span>
                                      </p>
                                  </div>
                              </div>
                              <a class="navbar-item" target="_blank" rel="noopener" title="Download on GitHub" href="https://github.com/Aicirou/goindex-theme-acrou">
                                <i class="fab fa-github"></i> 
                              </a>
                          </div>
                      </div>
                  </div>
              </nav>
          `,
  });

export default navbar