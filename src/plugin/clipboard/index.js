/* eslint-disable no-unused-vars */
/**
 * reference vue-clipboard2
 * https://github.com/Inndy/vue-clipboard2
 */
import Clipboard from "clipboard";
import notify from "@/components/notification";

var VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true, // This fixes IE, see #50
};

const copy = (text, container) => {
  return new Promise(function(resolve, reject) {
    var fakeElement = document.createElement("button");
    var clipboard = new Clipboard(fakeElement, {
      text: function() {
        return text;
      },
      action: function() {
        return "copy";
      },
      container: typeof container === "object" ? container : document.body,
    });
    clipboard.on("success", function(e) {
      clipboard.destroy();
      resolve(e);
    });
    clipboard.on("error", function(e) {
      clipboard.destroy();
      reject(e);
    });
    if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement);
    fakeElement.click();
    if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement);
  });
};

var VueClipboard = {
  copy: copy,
  copyText: (text, container) => {
    return copy(text, container)
      .then(() => {
        notify({
          title: "notify.title",
          message: "copy.success",
          type: "success",
        });
      })
      .catch(() => {
        notify({
          title: "notify.title",
          message: "copy.error",
          type: "error",
        });
      });
  },
  install: function(Vue) {
    Vue.prototype.$clipboardConfig = VueClipboardConfig;
    Vue.prototype.$copy = copy;
    Vue.prototype.$copyText = this.copyText;

    Vue.directive("clipboard", {
      bind: function(el, binding, vnode) {
        if (binding.arg === "success") {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === "error") {
          el._vClipboard_error = binding.value;
        } else {
          var clipboard = new Clipboard(el, {
            text: function() {
              return binding.value;
            },
            action: function() {
              return binding.arg === "cut" ? "cut" : "copy";
            },
            container: VueClipboardConfig.autoSetContainer ? el : undefined,
          });
          clipboard.on("success", function(e) {
            var callback = el._vClipboard_success;
            callback && callback(e);
          });
          clipboard.on("error", function(e) {
            var callback = el._vClipboard_error;
            callback && callback(e);
          });
          el._vClipboard = clipboard;
        }
      },
      update: function(el, binding) {
        if (binding.arg === "success") {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === "error") {
          el._vClipboard_error = binding.value;
        } else {
          el._vClipboard.text = function() {
            return binding.value;
          };
          el._vClipboard.action = function() {
            return binding.arg === "cut" ? "cut" : "copy";
          };
        }
      },
      unbind: function(el, binding) {
        if (binding.arg === "success") {
          delete el._vClipboard_success;
        } else if (binding.arg === "error") {
          delete el._vClipboard_error;
        } else {
          el._vClipboard.destroy();
          delete el._vClipboard;
        }
      },
    });
  },
  config: VueClipboardConfig,
};

export default VueClipboard;
