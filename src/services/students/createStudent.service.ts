import { v4 as uuid } from 'uuid';
import { AppDataSource } from '../../data-source';
import { Student } from '../../entities/Student';
import { IStudentCreation } from '../../interfaces/Student/student.interface';

const createStudentService = async ({
	name,
	birth_date,
	address,
}: IStudentCreation) => {
	const studentRepository = AppDataSource.getRepository(Student);

	const student = new Student();
	student.id = uuid();
	student.name = name;
	student.birth_date = birth_date;
	student.address = address;
	student.createdAt = Date();
	student.entered_at = Date();
	student.lefted_at = Date();

	studentRepository.create(student);
	await studentRepository.save(student);

	return student;
};

export default createStudentService;
