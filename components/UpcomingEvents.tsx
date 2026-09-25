"use client";

import { useEffect, useState } from "react";
import { formatEventDate, localToday } from "@/lib/dates";
import type { IssueEvent } from "@/lib/issues";

interface Props {
  events: IssueEvent[];
  /** Build date ("YYYY-MM-DD"); used until the browser tells us today's date. */
  builtOn: string;
  emptyText?: string;
  /** Narrow sidebar: hide the longer `details` text. */
  compact?: boolean;
}

/**
 * The site is static, so "upcoming" is decided in the browser: the server
 * renders events from the build date onward, then the client trims anything
 * that has since passed.
 */
export function UpcomingEvents({ events, builtOn, emptyText, compact = false }: Props) {
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
    <ul className={`event-days${compact ? " event-days--compact" : ""}`}>
      {days.map((day) => (
        <li key={day} className="event-day">
          <p className="event-day__date">
            <time dateTime={day}>{formatEventDate(day)}</time>
          </p>
          <ul className="event-day__items">
            {upcoming
              .filter((e) => e.date === day)
              .map((e) => (
                <li key={`${e.title}-${e.time ?? ""}`} className="event">
                  <span className="event__time">{e.time ?? ""}</span>
                  <span className="event__body">
                    <span className="event__title">{e.title}</span>
                    {e.place ? <span className="event__place">{e.place}</span> : null}
                    {!compact && e.details ? (
                      <span className="event__details">{e.details}</span>
                    ) : null}
                  </span>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
