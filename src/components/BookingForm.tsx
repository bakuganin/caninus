import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookingData } from "../types";
import { Calendar, Phone, User, MessageSquare, Check, Loader2 } from "lucide-react";

type BookingFormProps = {
  language: "et" | "ru";
  onDevelopmentClick: () => void;
};

const bookingCopy = {
  et: {
    required: "Palun täitke nimi ja telefoninumber.",
    fullName: "Teie nimi",
    phone: "Telefoninumber",
    problem: "Kirjeldage lühidalt oma muret",
    preferredDate: "Soovitud visiidi kuupäev",
    development: "Arenduses",
    successTitle: "Päring on vastu võetud",
    successText: "Saime teie konsultatsioonipäringu dr. Jevgeni Abramovitsile.",
    patient: "Patsient:",
    contactPhone: "Kontakttelefon:",
    date: "Soovitud kuupäev:",
    problemLabel: "Probleemi kirjeldus:",
    note:
      "Dr. Jevgeni Abramovits võtab teiega ühendust, et kinnitada täpne vastuvõtuaeg. Täname usalduse eest Caninuse kliiniku vastu.",
    reset: "Broneeri veel kord",
  },
  ru: {
    required: "Пожалуйста, заполните имя и номер телефона.",
    fullName: "Ваше имя",
    phone: "Номер телефона",
    problem: "Опишите вкратце вашу проблему",
    preferredDate: "Желаемая дата визита",
    development: "В разработке",
    successTitle: "Заявка принята!",
    successText: "Мы успешно получили ваш запрос на консультацию у д-ра Евгения Абрамовитса.",
    patient: "Пациент:",
    contactPhone: "Телефон для связи:",
    date: "Желаемая дата:",
    problemLabel: "Описание проблемы:",
    note:
      "Д-р Евгений Абрамовитс свяжется с вами по указанному телефону в ближайшее время для подтверждения точного времени приема. Благодарим за доверие к клинике Caninus!",
    reset: "Записаться еще раз",
  },
};

export default function BookingForm({ language, onDevelopmentClick }: BookingFormProps) {
  const t = bookingCopy[language];
  const [formData, setFormData] = useState<BookingData>({
    fullName: "",
    phone: "",
    problem: "",
    preferredDate: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert(t.required);
      return;
    }

    setStatus("loading");
    // Simulate real server response
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ fullName: "", phone: "", problem: "", preferredDate: "" });
    setStatus("idle");
  };

  return (
    <div className="w-full max-w-full">
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.form
            key="booking-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Full Name input */}
            <div className="relative group">
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder=" "
                className="w-full text-stone-800 bg-transparent border-b border-stone-300 py-3.5 px-1 focus:outline-none focus:border-stone-900 transition-colors duration-300 peer placeholder-shown:border-stone-200"
              />
              <label
                htmlFor="fullName"
                className="absolute text-stone-400 left-1 top-3 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-stone-900"
              >
                {t.fullName}
              </label>
              <User className="absolute right-2 top-3 text-stone-300 w-5 h-5 pointer-events-none group-focus-within:text-stone-850 transition-colors" />
            </div>

            {/* Phone Number input */}
            <div className="relative group">
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder=" "
                className="w-full text-stone-800 bg-transparent border-b border-stone-300 py-3.5 px-1 focus:outline-none focus:border-stone-900 transition-colors duration-300 peer placeholder-shown:border-stone-200"
              />
              <label
                htmlFor="phone"
                className="absolute text-stone-400 left-1 top-3 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-stone-900"
              >
                {t.phone}
              </label>
              <Phone className="absolute right-2 top-3 text-stone-300 w-5 h-5 pointer-events-none group-focus-within:text-stone-850 transition-colors" />
            </div>

            {/* Briefly describe problem */}
            <div className="relative group">
              <input
                type="text"
                id="problem"
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder=" "
                className="w-full text-stone-800 bg-transparent border-b border-stone-300 py-3.5 px-1 focus:outline-none focus:border-stone-900 transition-colors duration-300 peer placeholder-shown:border-stone-200"
              />
              <label
                htmlFor="problem"
                className="absolute text-stone-400 left-1 top-3 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-stone-900"
              >
                {t.problem}
              </label>
              <MessageSquare className="absolute right-2 top-3 text-stone-300 w-5 h-5 pointer-events-none group-focus-within:text-stone-850 transition-colors" />
            </div>

            {/* Preferred Date */}
            <div className="relative group">
              <input
                type="text"
                id="preferredDate"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder=" "
                className="w-full text-stone-800 bg-transparent border-b border-stone-300 py-3.5 px-1 focus:outline-none focus:border-stone-900 transition-colors duration-300 peer placeholder-shown:border-stone-200"
              />
              <label
                htmlFor="preferredDate"
                className="absolute text-stone-400 left-1 top-3 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-stone-900"
              >
                {t.preferredDate}
              </label>
              <Calendar className="absolute right-2 top-3 text-stone-300 w-5 h-5 pointer-events-none group-focus-within:text-stone-850 transition-colors" />
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={onDevelopmentClick}
                className="development-form-button w-full sm:w-auto px-12 py-4.5 bg-[#212121] text-white rounded-full font-sans tracking-widest text-[13px] uppercase transition-all duration-300 shadow-md select-none flex items-center justify-center gap-3"
              >
                {t.development}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/60 p-8 text-center shadow-xl flex flex-col items-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-905">{t.successTitle}</h3>
              <p className="text-sm text-stone-500 max-w-sm">
                {t.successText}
              </p>
            </div>

            <div className="w-full border-t border-stone-100 pt-5 space-y-3 text-left text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{t.patient}</span>
                <strong className="text-stone-850">{formData.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span>{t.contactPhone}</span>
                <strong className="text-stone-850">{formData.phone}</strong>
              </div>
              {formData.preferredDate && (
                <div className="flex justify-between">
                  <span>{t.date}</span>
                  <strong className="text-stone-500">{formData.preferredDate}</strong>
                </div>
              )}
              {formData.problem && (
                <div className="flex flex-col gap-1 pt-1 border-t border-dashed border-stone-100 text-stone-500">
                  <span>{t.problemLabel}</span>
                  <p className="italic text-stone-700 bg-stone-50 p-2 rounded border border-stone-100/50 mt-1">
                    "{formData.problem}"
                  </p>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-400 pt-2 leading-relaxed">
              {t.note}
            </p>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 border border-stone-300 hover:border-stone-900 rounded-full text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all font-medium cursor-pointer"
            >
              {t.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
