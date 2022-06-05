
import { CreateTourInput} from "@generated/graphql";


export function getTourDefaultValues(tour: any) {
	if (!tour) {
		return {
			name: '',
			description: '',
			image1: '',
			slot: 0,
			startDate: '',
			endDate: '',
			status: '',
		}
	}
	return { ...tour }
}

export function getTourInputValues(
	values: CreateTourInput,
	initialValues: any
) {
	const {
		...simpleValues

	} = values;
	return {
		...simpleValues,
	};
}


