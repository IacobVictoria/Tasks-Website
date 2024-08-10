import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanDeactivateFn,
	MaybeAsync,
	GuardResult,
} from '@angular/router';
import { inject } from '@angular/core';
import { ShowLeavePageConfirmationDialog } from '../_interfaces/show-leave-confirmation-dialog.interface';
import { ConfirmDialogService } from '../_services/confirmation-dialog-service';

export const showLeavePageConfirmationDialogGuard: CanDeactivateFn<ShowLeavePageConfirmationDialog> = (
	component: ShowLeavePageConfirmationDialog,
	currentRoute: ActivatedRouteSnapshot,
	currentState: RouterStateSnapshot,
	nextState: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
	const dialogService = inject(ConfirmDialogService);

	if (component.showLeavePageConfirmationDialog()) {
		const dialogRef = dialogService.confirmDialog({
			title: 'Confirm Cancel',
			message:
				'Are you sure you want to cancel? Any unsaved changes will be lost.',
			confirmText: 'Yes, Cancel',
			cancelText: 'No, Go Back',
		});

        return dialogRef;
	}

	return true;
};
