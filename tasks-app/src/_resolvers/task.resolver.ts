//Resolvers în Angular sunt folosite pentru a 

import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Task } from "../_interfaces/task.interface";
import { ActiveTaskService } from "../_services/active_tasks.service";
import { inject } from "@angular/core";

//pre-încărca date înainte de a naviga la o anumită rută. 
export const TaskResolver: ResolveFn<Task | null> = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) => {
	const taskService = inject(ActiveTaskService);
	const id = route.paramMap.get('id');

	if (!id) {
		return null;
	}

	return taskService.getTaskByID(id);
};
