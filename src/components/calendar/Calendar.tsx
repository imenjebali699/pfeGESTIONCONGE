"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridWeek from "@fullcalendar/timegrid";
import { EventInput, EventContentArg } from "@fullcalendar/core";
import { useRouter } from "next/navigation";

// Fonction pour calculer les fêtes islamiques (approximation basée sur les années)
const getIslamicHolidays = (year: number) => {
  const holidays = [
    { title: "Aïd El Fitr", date: "2025-03-30" }, // Ajuster selon le calendrier islamique
    { title: "Aïd El Adha", date: "2025-06-07" },
    { title: "Nouvel An Hijri", date: "2025-07-27" },
  ];

  return holidays.map((holiday) => ({
    title: holiday.title,
    start: holiday.date.replace("2025", year.toString()), // Adapter chaque année
    extendedProps: { category: "holiday" },
  }));
};

// Fonction pour générer les jours fériés fixes
const getFixedHolidays = (year: number) => [
  { title: "Nouvel An", date: `${year}-01-01` },
  { title: "Fête de la Révolution", date: `${year}-01-14` },
  { title: "Fête de l’Indépendance", date: `${year}-03-20` },
  { title: "Fête du Travail", date: `${year}-05-01` },
  { title: "Fête de la République", date: `${year}-07-25` },
  { title: "Jour de l'Évacuation", date: `${year}-10-15` },
].map((holiday) => ({
  title: holiday.title,
  start: holiday.date,
  extendedProps: { category: "holiday" },
}));

// Générer les événements pour plusieurs années
const getHolidaysForNextYears = (yearsCount: number) => {
  const currentYear = new Date().getFullYear();
  let events: EventInput[] = [];

  for (let i = 0; i < yearsCount; i++) {
    const year = currentYear + i;
    events = [
      ...events,
      ...getFixedHolidays(year),
      ...getIslamicHolidays(year),
    ];
  }

  return events;
};

const CongeCalendar: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const router = useRouter();

  useEffect(() => {
    const holidays = getHolidaysForNextYears(10); // Obtenir les jours fériés pour les 10 prochaines années
    setEvents(holidays);
  }, []);

  const handleDateSelect = () => {
    router.push("/form-elements");
  };

  const handleLeaveClick = () => {
    router.push("/form-elements");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridWeek, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleLeaveClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "Demander un congé +",
              click: () => router.push("/form-elements"),
            },
          }}
        />
      </div>
    </div>
  );
};

interface ExtendedProps {
  category?: string;
}

const renderEventContent = (eventInfo: EventContentArg) => {
  const extendedProps = eventInfo.event.extendedProps as ExtendedProps;
  const category = extendedProps?.category || "default";
  const colorClass =
    category === "holiday" ? "bg-red-500 text-white" : "bg-blue-500 text-white";

  return (
    <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default CongeCalendar;