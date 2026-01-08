"use client";

import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

type CalendarEvent = DayPilot.EventData;

const WeekSchedule: React.FC = () => {
  const [calendar, setCalendar] = useState<DayPilot.Calendar | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents([
      {
        id: 1,
        start: "2026-01-05T09:00:00",
        end: "2026-01-05T11:00:00",
        text: "Team Meeting"
      }
    ]);
  }, []);


  const changeWeek = (days: number) => {
    if (!calendar) return;
  
    const start =
      calendar.startDate instanceof DayPilot.Date
        ? calendar.startDate
        : DayPilot.Date.today();
  
    calendar.update({
      startDate: start.addDays(days)
    });
  };
  

  return (
    <div>
      <button onClick={() => changeWeek(-7)}>Previous Week</button>
      <button onClick={() => changeWeek(7)}>Next Week</button>

      <DayPilotCalendar
        viewType="Week"
        startDate={DayPilot.Date.today()}
        events={events}
        controlRef={setCalendar}
        businessBeginsHour={7}
        businessEndsHour={16}
        heightSpec="BusinessHours"
        timeRangeSelectedHandling="Enabled"
      />
    </div>
  );
};

export default WeekSchedule;
