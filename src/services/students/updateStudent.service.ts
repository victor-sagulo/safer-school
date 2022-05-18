import { AppDataSource } from '../../data-source';
import { Student } from '../../entities/Student';

const updateStudentService = async (
	name: string,
	birth_date: string,
	address: string,
	id: string
) => {
	const studentsRepository = AppDataSource.getRepository(Student);

	const studentsTable = studentsRepository.find();

	const student = (await studentsTable).find((student) => student.id === id);

	if (name) {
		await studentsRepository.update(student!.id, {
			name: name,
		});
	}

	if (birth_date) {
		await studentsRepository.update(student!.id, {
			birthDate: birth_date,
		});
	}

	if (address) {
		await studentsRepository.update(student!.id, {
			address: address,
		});
	}

	// await studentsRepository.update(student!.id, {
	// 	name: name,
	// 	birthDate: birth_date,
	// 	address: address,
	// });

	return true;
};
export default updateStudentService;
