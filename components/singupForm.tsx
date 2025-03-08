"use client";
import React, { useReducer, useState, useRef, useEffect } from "react";
import {  IconButton } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { useLoading } from "@/app/context/LoadingContext";
import { useRouter } from 'next/navigation'

const reducer = (state: any, action: any) => {
  return { ...state, [action.name]: action.value };
};
const defaultState = {
  EN_lname: "",
  EN_fname: "",
  TH_lname: "",
  TH_fname: "",
  academy: "",
  branch: "",
  confirmPassword: "",
  email: "",
  password: "",
  phone: "",
  title: "",
  province: "",
  sector: "",
};

type error = {
  [key in keyof typeof defaultState]: boolean;
};

function SingupFrom() {
  const { setLoading } = useLoading();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {});
  const [active, setActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<error>({
    title: false,
    TH_fname: false,
    TH_lname: false,
    EN_fname: false,
    EN_lname: false,
    academy: false,
    province: false,
    sector: false,
    branch: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({});

  const prefix = [
    { value: "", label: "เลือกคำนำหน้า" },
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];

  const validate = (name: string, value: string) => {
    switch (name) {
      case "phone":
        return /^\d{10}$/.test(value);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "password":
        return value.length >= 6;
      case "confirmPassword":
        return value === state.password;
      default:
        return value.trim() !== "";
    }
  };

  const handlechange = (e: any, pattern: RegExp) => {
    const { name, value } = e.target;
    if (pattern.test(value) || value === "") {
      dispatch({ name, value });
      setErrors((prev) => ({ ...prev, [name]: !validate(name, value) }));
    }
    setApiErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const sentdata = async (e: any) => {
    e.preventDefault();

    const newErrors: error = { ...errors };
    Object.keys(defaultState).forEach((field) => {
      newErrors[field as keyof error] =
        !state[field as keyof typeof state]?.trim();
    });

    setErrors(newErrors);

    const hasErrors = Object.values(errors).some((error) => error);
    const isEmpty = Object.keys(defaultState).some(
      (field) => !state[field]?.trim()
    );

    if (hasErrors || isEmpty) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้องตามเเบบฟอร์ม",
      });
      return;
    }
    setLoading(true);
    try {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        icon: "success",
        title: "ลงทะเบียนสำเร็จ",
      });
      router.push('/course')
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex justify-center items-center  min-h-screen w-full p-4 lg:p-10">
        <div className="w-full max-w-6xlrounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2  text-white flex flex-col  p-8">
            <img
              src="/pageform.png"
              alt="Registration"
              className="absolute top-0 left-0 w-full h-full object-cover md:rounded-lg"
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold">หมายเหตุ</h2>
              <div className="mt-4 flex items-center">
                <img
                  src="/Hand Right.svg"
                  alt="icon"
                  className="w-6 h-6 mr-2"
                />
                <p className="text-start text-sm md:text-lg lg:text-xl">
                  สำหรับวิทยากร สามารถเข้าสู่ระบบได้เลย (โดยไม่ต้องลงทะเบียน)
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <img
                  src="/Hand Right.svg"
                  alt="icon"
                  className="w-6 h-6 mr-2"
                />
                <p className="text-sm md:text-lg lg:text-xl">
                  หากมีบัญชีอยู่แล้ว
                  <a
                    href="/aunth/login"
                    className="text-yellow-400 hover:underline ml-1"
                  >
                    เข้าสู่ระบบ
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
              ลงทะเบียน
            </h2>
            <form onSubmit={sentdata} className="space-y-6">
              <div>
                <TextField
                  className="w-full"
                  name="title"
                  onChange={(e) => handlechange(e, /.+/)}
                  select
                  label="คำนำหน้า"
                  value={state.title || ""}
                  error={errors.title}
                  helperText={errors.title ? "กรุณาเลือกคำนำหน้า" : ""}
                >
                  {prefix.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="TH_fname"
                  value={state.TH_fname || ""}
                  onChange={(e) => handlechange(e, /^[ก-๏\s]+$/)}
                  label="ชื่อ"
                  variant="outlined"
                  error={errors.TH_fname}
                  helperText={errors.TH_fname ? "กรุณากรอกชื่อ" : ""}
                />

                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="TH_lname"
                  value={state.TH_lname || ""}
                  onChange={(e) => handlechange(e, /^[ก-๏\s]+$/)}
                  label="นามสกุล"
                  variant="outlined"
                  error={errors.TH_lname}
                  helperText={errors.TH_lname ? "กรุณากรอกนามสกุล" : ""}
                />
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="EN_fname"
                  value={state.EN_fname || ""}
                  onChange={(e) => handlechange(e, /^[a-zA-Z\s]+$/)}
                  label="ชื่อ(ภาษาอังกฤษ)"
                  variant="outlined"
                  error={errors.EN_fname}
                  helperText={
                    errors.EN_fname ? "กรุณากรอกชื่อ(ภาษาอังกฤษ)" : ""
                  }
                />

                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="EN_lname"
                  value={state.EN_lname || ""}
                  onChange={(e) => handlechange(e, /^[a-zA-Z\s]+$/)}
                  label="นามสกุล(ภาษาอังกฤษ)"
                  variant="outlined"
                  error={errors.EN_lname}
                  helperText={
                    errors.EN_lname ? "กรุณากรอกนามสกุล(ภาษาอังกฤษ)" : ""
                  }
                />
              </div>

              <div className="border-t border-gray-300 flex-grow"></div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="academy"
                  value={state.academy || ""}
                  onChange={(e) => handlechange(e, /.+/)}
                  label="ชื่อสถานศึกษา"
                  variant="outlined"
                  error={errors.academy}
                  helperText={errors.academy ? "กรุณากรอกชื่อสถานศึกษา" : ""}
                />

                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="province"
                  value={state.province || ""}
                  onChange={(e) => handlechange(e, /.+/)}
                  label="จังหวัด"
                  variant="outlined"
                  error={errors.province}
                  helperText={errors.province ? "กรุณากรอกจังหวัด" : ""}
                />
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="sector"
                  value={state.sector || ""}
                  onChange={(e) => handlechange(e, /.+/)}
                  label="ภาค"
                  variant="outlined"
                  error={errors.sector}
                  helperText={errors.sector ? "กรุณากรอกภาค" : ""}
                />

                <TextField
                  margin="normal"
                  className="w-full mb-2 md:w-1/2"
                  name="branch"
                  value={state.branch || ""}
                  onChange={(e) => handlechange(e, /.+/)}
                  label="สาขาวิชาที่สอน"
                  variant="outlined"
                  error={errors.branch}
                  helperText={errors.branch ? "กรุณากรอกสาขาวิชาที่สอน" : ""}
                />
              </div>

              <div className="border-t border-gray-300 flex-grow"></div>
              <div>
                <TextField
                  margin="normal"
                  className="w-full mb-2 "
                  name="email"
                  type="email"
                  value={state.email || ""}
                  onChange={(e) => handlechange(e, /.+/)}
                  label="อีเมล"
                  variant="outlined"
                  error={errors.email}
                  helperText={
                    apiErrors.email
                      ? apiErrors.email
                      : errors.email
                      ? "กรุณากรอกอีเมลให้ถูกต้องตามแบบฟอร์ม abc@gmail.com"
                      : ""
                  }
                />
              </div>

              <div>
                <TextField
                  margin="normal"
                  className="w-full mb-2 "
                  name="phone"
                  type="text"
                  value={state.phone || ""}
                  onChange={(e) => handlechange(e, /^[0-9]*$/)}
                  label="เบอร์ติดต่อ"
                  variant="outlined"
                  error={errors.phone}
                  helperText={
                    apiErrors.phone
                      ? apiErrors.phone
                      : errors.phone
                      ? "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"
                      : ""
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <FormControl
                  margin="normal"
                  variant="outlined"
                  className="w-full mb-2 md:w-1/2"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    รหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    value={state.password || ""}
                    onChange={(e) => handlechange(e, /.+/)}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="รหัสผ่าน"
                    error={errors.password}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      กรุณากรอกรหัสผ่าน 6 ตัวขึ้นไป
                    </p>
                  )}
                </FormControl>
                <FormControl
                  margin="normal"
                  variant="outlined"
                  className="w-full md:w-1/2"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    ยืนยันรหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    name="confirmPassword"
                    value={state.confirmPassword || ""}
                    onChange={(e) => handlechange(e, /.+/)}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="ยืนยันรหัสผ่าน"
                    error={errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">รหัสผ่านไม่ตรงกัน</p>
                  )}
                </FormControl>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
                <p>
                  ยอมรับ
                  <a href="#" className="text-blue-500 hover:underline ml-1">
                    ข้อตกลงและเงื่อนไขในการใช้บริการ
                  </a>
                </p>
              </div>
              <button
                disabled={!active}
                type="submit"
                className={`w-full  ${
                  active ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 "
                } text-white p-3 rounded text-lg`}
              >
                ลงทะเบียน
              </button>
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-2 text-gray-500">หรือ</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
              <button
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center justify-center"
              >
                <GoogleIcon />
                เข้าสู่ระบบด้วย Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingupFrom;