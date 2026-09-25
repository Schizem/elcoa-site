"use client";

import { useEffect, useState } from "react";
import { formatEventDate, localToday } from "@/lib/dates";
import type { IssueEvent } from "@/lib/issues";

interface Props {
  events: IssueEvent[];
  /** Build date ("YYYY-MM-DD"); used until the browser tells us today's date. */
  builtOn: string;
  emptyText?: string;
}

/**
 * The site is static, so "upcoming" is decided in the browser: the server
 * renders events from the build date onward, then the client trims anything
 * that has since passed.
 */
export function UpcomingEvents({ events, builtOn, emptyText }: Props) {
  const [today, setToday] = useState(builtOn);
  useEffect(() => setToday(localToday()), []);

  const upcoming = events.filter((e) => e.date >= today);

  if (upcoming.length === 0) {
    return (
      <p className="events-empty">
        {emptyText ?? "No dates on the calendar yet. The next Chatter will list them."}
      </p>
    );
  }

  // Group same-day entries under one date heading.
  const days = [...new Set(upcoming.map((e) => e.date))];

  return (
    <ul className="event-days">
      {days.map((day) => (
        <li key={day} className="event-day">
          <p className="event-day__date">
            <time dateTime={day}>{formatEventDate(day)}</time>
          </p>
          <ul className="event-day__items">
            {upcoming
              .filter((e) => e.date === day)
              .map((e) => (
                <li key={`${e.title}-${e.time ?? ""}`}>
                  {e.time ? <span className="event-time">{e.time}</span> : null}
                  <span className="event-title">{e.title}</span>
                  {e.place ? <span className="event-place"> &middot; {e.place}</span> : null}
                  {e.details ? <span className="event-details">{e.details}</span> : null}
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
