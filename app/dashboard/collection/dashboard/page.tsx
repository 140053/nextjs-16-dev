import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardPage from "@/components/dashboardpage";

import { AddBookBySubForm } from "@/components/collection/CollectionUI";
import { SearchBar } from "@/components/custom/searchBar";
import GetBook from "@/components/collection/getbook";
import DdcCharts from "@/components/collection/DdcCharts";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Page() {
  const user = await getSession();
  if (!user) redirect("/login");

  return (
    <DashboardPage
      title="Dashboard"
      parent="Collection Management"
      parentHref="#"
    >
      <div className="flex flex-col justify-center m-5">
        <Card>
          <CardHeader>
            <h2 className="text-4xl">Collection Mamanagement Analysis</h2>
          </CardHeader>
        </Card>
        <DdcCharts
          title="📊 DDC Classification [00-999]"
          line={false}
          pie={false}
          bar={true}
          ranges={[
            { label: "00-99", min: 0, max: 99 },
            { label: "100-199", min: 100, max: 199 },
            { label: "200-299", min: 200, max: 299 },
            { label: "300-399", min: 300, max: 399 },
            { label: "400-499", min: 400, max: 499 },
            { label: "500-599", min: 500, max: 599 },
            { label: "600-699", min: 600, max: 699 },
            { label: "700-799", min: 700, max: 799 },
            { label: "800-899", min: 800, max: 899 },
            { label: "900-999", min: 900, max: 999 },
          ]}
        />

        {/* 00-99 */}
        <DdcCharts
          title="📊 DDC Classification [00-99]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "00-10", min: 0, max: 10 },
            { label: "11-20", min: 11, max: 20 },
            { label: "21-30", min: 21, max: 30 },
            { label: "31-40", min: 31, max: 40 },
            { label: "41-50", min: 41, max: 50 },
            { label: "51-60", min: 51, max: 60 },
            { label: "61-70", min: 61, max: 70 },
            { label: "71-80", min: 71, max: 80 },
            { label: "81-90", min: 81, max: 90 },
            { label: "91-99", min: 91, max: 99 },
          ]}
        />

        {/* 100-199 */}
        <DdcCharts
          title="📊 DDC Classification [100-199]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "100-110", min: 100, max: 110 },
            { label: "111-120", min: 111, max: 120 },
            { label: "121-130", min: 121, max: 130 },
            { label: "131-140", min: 131, max: 140 },
            { label: "141-150", min: 141, max: 150 },
            { label: "151-160", min: 151, max: 160 },
            { label: "161-170", min: 161, max: 170 },
            { label: "171-180", min: 171, max: 180 },
            { label: "181-190", min: 181, max: 190 },
            { label: "191-199", min: 191, max: 199 },
          ]}
        />

        {/* 200-299 */}
        <DdcCharts
          title="📊 DDC Classification [200-299]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "200-210", min: 200, max: 210 },
            { label: "211-220", min: 211, max: 220 },
            { label: "221-230", min: 221, max: 230 },
            { label: "231-240", min: 231, max: 240 },
            { label: "241-250", min: 241, max: 250 },
            { label: "251-260", min: 251, max: 260 },
            { label: "261-270", min: 261, max: 270 },
            { label: "271-280", min: 271, max: 280 },
            { label: "281-290", min: 281, max: 290 },
            { label: "291-299", min: 291, max: 299 },
          ]}
        />

        {/* 300-399 */}
        <DdcCharts
          title="📊 DDC Classification [300-399]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "300-310", min: 300, max: 310 },
            { label: "311-320", min: 311, max: 320 },
            { label: "321-330", min: 321, max: 330 },
            { label: "331-340", min: 331, max: 340 },
            { label: "341-350", min: 341, max: 350 },
            { label: "351-360", min: 351, max: 360 },
            { label: "361-370", min: 361, max: 370 },
            { label: "371-380", min: 371, max: 380 },
            { label: "381-390", min: 381, max: 390 },
            { label: "391-399", min: 391, max: 399 },
          ]}
        />

        {/* 400-499 */}
        <DdcCharts
          title="📊 DDC Classification [400-499]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "400-410", min: 400, max: 410 },
            { label: "411-420", min: 411, max: 420 },
            { label: "421-430", min: 421, max: 430 },
            { label: "431-440", min: 431, max: 440 },
            { label: "441-450", min: 441, max: 450 },
            { label: "451-460", min: 451, max: 460 },
            { label: "461-470", min: 461, max: 470 },
            { label: "471-480", min: 471, max: 480 },
            { label: "481-490", min: 481, max: 490 },
            { label: "491-499", min: 491, max: 499 },
          ]}
        />

        {/* 500-599 */}
        <DdcCharts
          title="📊 DDC Classification [500-599]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "500-510", min: 500, max: 510 },
            { label: "511-520", min: 511, max: 520 },
            { label: "521-530", min: 521, max: 530 },
            { label: "531-540", min: 531, max: 540 },
            { label: "541-550", min: 541, max: 550 },
            { label: "551-560", min: 551, max: 560 },
            { label: "561-570", min: 561, max: 570 },
            { label: "571-580", min: 571, max: 580 },
            { label: "581-590", min: 581, max: 590 },
            { label: "591-599", min: 591, max: 599 },
          ]}
        />

        {/* 600-699 */}
        <DdcCharts
          title="📊 DDC Classification [600-699]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "600-610", min: 600, max: 610 },
            { label: "611-620", min: 611, max: 620 },
            { label: "621-630", min: 621, max: 630 },
            { label: "631-640", min: 631, max: 640 },
            { label: "641-650", min: 641, max: 650 },
            { label: "651-660", min: 651, max: 660 },
            { label: "661-670", min: 661, max: 670 },
            { label: "671-680", min: 671, max: 680 },
            { label: "681-690", min: 681, max: 690 },
            { label: "691-699", min: 691, max: 699 },
          ]}
        />

        {/* 700-799 */}
        <DdcCharts
          title="📊 DDC Classification [700-799]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "700-710", min: 700, max: 710 },
            { label: "711-720", min: 711, max: 720 },
            { label: "721-730", min: 721, max: 730 },
            { label: "731-740", min: 731, max: 740 },
            { label: "741-750", min: 741, max: 750 },
            { label: "751-760", min: 751, max: 760 },
            { label: "761-770", min: 761, max: 770 },
            { label: "771-780", min: 771, max: 780 },
            { label: "781-790", min: 781, max: 790 },
            { label: "791-799", min: 791, max: 799 },
          ]}
        />

        {/* 800-899 */}
        <DdcCharts
          title="📊 DDC Classification [800-899]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "800-810", min: 800, max: 810 },
            { label: "811-820", min: 811, max: 820 },
            { label: "821-830", min: 821, max: 830 },
            { label: "831-840", min: 831, max: 840 },
            { label: "841-850", min: 841, max: 850 },
            { label: "851-860", min: 851, max: 860 },
            { label: "861-870", min: 861, max: 870 },
            { label: "871-880", min: 871, max: 880 },
            { label: "881-890", min: 881, max: 890 },
            { label: "891-899", min: 891, max: 899 },
          ]}
        />

        {/* 900-999 */}
        <DdcCharts
          title="📊 DDC Classification [900-999]"
          line={false}
          pie={true}
          bar={false}
          ranges={[
            { label: "900-910", min: 900, max: 910 },
            { label: "911-920", min: 911, max: 920 },
            { label: "921-930", min: 921, max: 930 },
            { label: "931-940", min: 931, max: 940 },
            { label: "941-950", min: 941, max: 950 },
            { label: "951-960", min: 951, max: 960 },
            { label: "961-970", min: 961, max: 970 },
            { label: "971-980", min: 971, max: 980 },
            { label: "981-990", min: 981, max: 990 },
            { label: "991-999", min: 991, max: 999 },
          ]}
        />
      </div>
    </DashboardPage>
  );
}
``;
