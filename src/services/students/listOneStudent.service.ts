import { AppDataSource } from '../../data-source';
import { Student } from '../../entities/Student';

export const listStudentsService = async (id: string) => {
	const studentsRepository = AppDataSource.getRepository(Student);

	const studentsTable = studentsRepository.find();

	const student = (await studentsTable).filter((user) => user.id === id);

	return student;
};

export default listStudentsService;
