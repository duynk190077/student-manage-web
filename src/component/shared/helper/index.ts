import Teacher from '../../../interfaces/Teacher';

export const validateName = (name: string) => {
  if (name === '') return { status: true, error: 'Tên không được để trống' };
  if (
    !name.match(
      /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
    )
  )
    return { status: true, error: 'Tên chỉ bao gồm các kí tự a-zA-z' };
  return { status: false };
};

export const validateEmail = (email: string) => {
  if (email === '') return { status: true, error: 'Email không được để trống' };
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    return { status: true, error: 'Địa chỉ email không hợp lệ' };
  return { status: false };
};

export const validatePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber === '')
    return { status: true, error: 'Số điện thoại không được để trống' };
  if (phoneNumber.length !== 10)
    return {
      status: true,
      error: 'Số điện thoại phải bao gồm đúng 10 kí tự 0-9',
    };
  if (!phoneNumber.match(/^[0-9]+$/))
    return { status: true, error: 'Số điện thoại chỉ bao gồm các chữ số 0-9' };
  return { status: false };
};

export const GetTokenFromStorage = () => {
  return localStorage.getItem('access_token');
};

export const GetRoleFromStorage = () => {
  return localStorage.getItem('role');
};

export const GetIdFromStroage = () => {
  return localStorage.getItem('id');
};

export const authHeader = () => {
  const token = GetTokenFromStorage();
  return {
    Authorization: 'Bearer ' + token,
  };
};

export const validateTeacher = (teacher: Teacher) => {
  let check = false;
  check = check || validateName(teacher.firstName).status;
  check = check || validateName(teacher.lastName).status;
  check = check || validateEmail(teacher.email).status;
  check = check || validatePhoneNumber(teacher.phoneNumber).status;
  return check;
};

export const getListWeek = (week: number) => {
  let listWeek: string[] = [];
  for (let i = 1; i <= 6; i++) listWeek.push((week + i).toString());
  return listWeek;
};
