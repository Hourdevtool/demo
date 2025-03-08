"use client";
import React, { useState} from "react";
import { Lock } from "lucide-react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useAuth } from "@/app/context/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/context/LoadingContext";
import Link from "next/link";
function LoginForm() {

  const {setLoading} = useLoading();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const {mail,  setmail, pass, setPass, role,  setRole, firstName,setFirstName,lastName,setLastName,} = useAuth();
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

  const handleEmailChange = (value: string) => {
    const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    console.log(!validate);
    setValidateEmail(!validate);
    setEmail(value);
  };


  const handlesubmit = async (e: any) => {
    e.preventDefault();
    if (validateEmail) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        icon: "warning",
        title: "กรุณากรอกemail ให้ถูกต้อง",
      });
      return;
    }
    if (email.trim().length === 0 || password.trim().length === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
      });
      return;
    }
    setLoading(true);
    try{
      if(email==='user@gmail.com'&&password==='user'){
        setmail(email)
        setPass(password)
        setRole('user')
        setFirstName('User')
        setLastName('User')
        let redirectUrl = "/course"; 
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
        });
        router.push(redirectUrl);
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: "error",
          title: "ขออภัยusernameหรือรหัสผ่านไม่ถูกต้อง",
        });
      }

      }
    catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full lg:p-10">
        <div className="w-full max-w-screen-2xl rounded shadow-md z-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <div className="relative h-full">
              <img
                src="/pageform.png"
                alt="Login Image"
                className="w-full h-[200px] md:h-full lg:h-full object-cover md:rounded-lg"
              />
              <div className="absolute top-4 left-4 text-white p-4  rounded-lg">
                <p className="font-semibold text-start text-xl md:text-2xl lg:text-3xl mb-4">
                  หมายเหตุ
                </p>

                <div className="flex flex-row items-center mb-4">
                  <img
                    src="/Hand Right.svg"
                    alt="Hand Right"
                    className="w-8 h-8 md:w-10 md:h-10 mr-3"
                  />
                  <p className="text-start text-sm md:text-lg lg:text-xl">
                    สำหรับวิทยากร สามารถเข้าสู่ระบบได้เลย (โดยไม่ต้องลงทะเบียน)
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <img
                    src="/Hand Right.svg"
                    alt="Hand Right"
                    className="w-8 h-8 md:w-10 md:h-10 mr-3"
                  />
                  <p className="text-sm md:text-lg lg:text-xl">
                    ยังไม่ได้เป็นสมาชิก?{" "}
                    <Link
                      href="/aunth/signup"
                      className="text-yellow-500 hover:underline"
                    >
                      คลิกเพื่อลงทะเบียน
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-6 ">
              <h2 className="text-5xl font-semibold text-center text-blue-600 mb-4">
                เข้าสู่ระบบ
              </h2>
              <form onSubmit={handlesubmit} className="mt-5">
                <TextField
                  margin="normal"
                  type="email"
                  className="w-full mb-4"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  label="อีเมล"
                  variant="outlined"
                  error={validateEmail}
                  helperText={
                    validateEmail
                      ? "กรุณากรอกอีเมลให้ถูกต้องตามแบบฟอร์ม abc@gmail.com"
                      : ""
                  }
                />

                <FormControl
                  margin="normal"
                  variant="outlined"
                  className="w-full mb-2 "
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    รหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  />
                </FormControl>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mb-2">
                  เข้าสู่ระบบ
                </button>
                <a
                  href="/forgot-password"
                  className="text-blue-500 text-sm my-4 flex"
                >
                  <Lock />
                  <span className="text-lg">ลืมรหัสผ่าน</span>
                </a>
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
      </div>
    </>
  );
}

export default LoginForm;
