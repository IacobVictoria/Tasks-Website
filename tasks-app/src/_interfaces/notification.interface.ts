import { NotificationType } from "../_enums/notification-type.enum";

export interface Notification {
	type: NotificationType;
	message: string;
}
