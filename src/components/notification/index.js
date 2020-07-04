import { Notification } from "element-ui";
import i18n from "@/i18n";

const notify = ({ title, message, type, duration }) => {
  Notification({
    title: i18n.t(title),
    message: i18n.t(message),
    type: type,
    duration: duration,
  });
};

export default notify;
