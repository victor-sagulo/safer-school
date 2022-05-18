import { AppDataSource } from '../../data-source';
import { Student } from '../../entities/Student';

const deleteStudentService = async (id: string) => {
	const studentRepository = AppDataSource.getRepository(Student);

	const studentsTable = studentRepository.find();

	const student = (await studentsTable).find((student) => student.id === id);

	await studentRepository.delete(student!);

	return true;
};

export default deleteStudentService;
