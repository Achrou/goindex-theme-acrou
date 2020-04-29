import Vue from "vue";
import axios from "@/utils/axios";
import { checkoutPath } from "@/utils/AcrouUtil";

var searchmodel = Vue.component("searchmodel", {
    // props: {
    //     show: {
    //         default: false,
    //         type: Boolean
    //     }
    // },
    data: function () {
        return {
            show: false
        };
    },
    methods: {
        go(file, target) {
            this.show = true
            var cur = window.current_drive_order
            axios.post(`/${cur}:id2path`, {id: file.id}).then((res) => {
                let data = res.data
                if(data){
                    var href = `/${cur}:${data}`;
                    href = checkoutPath(href,file)
                    if(target === '_blank'){
                        window.open(href)
                    }else{
                        location.href=href
                    }
                }
                this.show = false
            }).catch( e =>{
                this.show = false
                console.log(e)
            })
        },
        close(event) {
            if(event.currentTarget == event.target){
                this.$emit('close')
            }
        }
    },
    template: `
        <div :class="'modal' + (show ? ' is-active' : '')">
            <div class="modal-background"></div>
            <div class="modal-card">
                <section class="modal-card-body" style="border-radius: 20px;">
                    <center>
                        <h1 class="title is-5">正在获取目标路径...</h1>
                        <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </center>
                </section>
            </div>
        </div>
    `,
});

export default searchmodel;