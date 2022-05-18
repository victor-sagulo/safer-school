import { AppDataSource } from '../../data-source';
import { Student } from '../../entities/Student';

const leftAtService = async (id: string) => {
	const studentRepository = AppDataSource.getRepository(Student);

	const studentsTable = studentRepository.find();

	const student = (await studentsTable).find((student) => student.id === id);

	await studentRepository.update(student!.id, { leftAt: Date() });

	return true;
};

export default leftAtService;
