export const validateName = (name: string) => {
  if (name === '') return { status: true, error: 'Tên không được để trống' };
  if (!name.match(/^[a-zA-Z]+$/))
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

export const GetTokenFromStroage = () => {
  return localStorage.getItem('access_token');
};

export const GetIdFromStroage = () => {
  return localStorage.getItem('id');
};
