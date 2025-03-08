import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import Image from "next/image";
const TableCal = () => {
  const data = [
    {
      day: "วันอังคารที่ 1 เมษายน 2568",
      course: {
        image: "/React.png",
        name: "React for Beginners",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis omnis voluptatum nobis eos iusto veritatis cupiditate sed, esse optio repudiandae ea perferendis. Obcaecati, ullam! Minus inventore nisi eum ab asperiores!",
        instructor: "John Doe",
        numOfInstructors: 2,
        time: "08:00-09:00 น.",
      },
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <TableContainer
        component={Paper}
        className="border border-gray-300 rounded-lg shadow-lg"
      >
        <Table className="min-w-full">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="border px-4 py-2 text-gray-600 font-semibold text-center">
                วัน
              </TableCell>
              <TableCell className="border px-4 py-2 text-gray-600 font-semibold text-center">
                คอร์สเรียน
              </TableCell>
              <TableCell className="border px-4 py-2 text-gray-600 font-semibold text-center">
                รายละเอียด
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="border px-4 py-2 text-center whitespace-nowrap">
                  {row.day}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  <div className="flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
                    <Image
                      src={row.course?.image}
                      alt="Course Background"
                      width={400}
                      height={400}
                      className=" object-contain md:object-cover rounded-md "
                    />

                    <div className="space-y-1">
                      <p className="font-semibold text-gray-700">
                        {row.course.name}
                      </p>
                      <Divider sx={{ my: 3 }} />
                      <div className="max-w-xs">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {row.course.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border px-4 py-2 text-sm">
                  <div className="space-y-2">
                    {row.course.instructor && (
                      <p>
                        <strong>วิทยากร:</strong> {row.course.instructor}
                      </p>
                    )}
                    <p>
                      <strong>จำนวนวิทยากร:</strong>{" "}
                      {row.course.numOfInstructors}
                    </p>
                    <p>
                      <strong>เวลาอบรม:</strong> {row.course.time}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCal;
