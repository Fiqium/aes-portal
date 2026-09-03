import React from 'react';
import directorPhoto from './img/Prof_Suhaily.jpg';
import secretaryPhoto from './img/Puan_Salwa.jpg';
import sulamPhoto from './img/Sherliaty.jpg';
import elearningPhoto from './img/Sharifah_Nadia.jpg';
import ablPhoto from './img/Farhan_Ahlaamie.jpg';
import apelPhoto from './img/Siti_Fajar.jpg';
import mcPhoto from './img/Jihadah.jpg';
import obePhoto from './img/Aziah.jpg';
import odlPhoto from './img/Syalina.jpg'


export default function LeadershipMatrix() {
    const director = {
        name: "Prof. Dr. Suhaily",
        role: "Sector Director",
        division: "Academic Excellence Sector (AES)",
        img: directorPhoto, // Pass the imported variable here (no quotes!)
    };

    const secretariat = {
        name: "Puan Ana Salwa Md Zain",
        role: "Secretary",
        division: "Academic Excellence Sector (AES)",
        img: secretaryPhoto, // Pass the imported variable here (no quotes!)
        //img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256"
    };

    const unitHeads = [
        { name: "Puan Sharifah Nadia", role: "Head of Unit (HoU)", unit: "E-Learning Unit", icon: "fa-laptop-code", color: "from-blue-600 to-indigo-700", img: elearningPhoto },
        { name: "Puan Noorsyalina", role: "Head of Unit (HoU)", unit: "Open Distance Learning Unit (ODL)", icon: "fa-globe-asia", color: "from-purple-600 to-pink-700", img: odlPhoto },
        { name: "Puan Sherliaty", role: "Head of Unit (HoU)", unit: "Community Relation (SULAM) Unit", icon: "fa-users-cog", color: "from-emerald-600 to-teal-700", img: sulamPhoto },
        { name: "Puan Nor Aziah", role: "Head of Unit (HoU)", unit: "Outcome-Based Education (OBE) Unit", icon: "fa-chart-line", color: "from-rose-600 to-orange-600", img: obePhoto },
        { name: "Puan Siti Fajar", role: "Head of Unit (HoU)", unit: "Accreditation of Prior Experiential Learning Unit (APEL)", icon: "fa-user-graduate", color: "from-amber-600 to-red-700", img: apelPhoto },
        { name: "Puan Farhan Ahlaamie", role: "Head of Unit (HoU)", unit: "Action Based Learning (ABL) Unit", icon: "fa-puzzle-piece", color: "from-cyan-600 to-blue-700", img: ablPhoto },
        { name: "Puan Jihadah", role: "Head of Unit (HoU)", unit: "Micro-Credential Unit (MC)", icon: "fa-award", color: "from-fuchsia-600 to-pink-700", img: mcPhoto }
    ];

    return (
        <div className="mt-20 border-t border-slate-200/80 pt-16 bg-slate-50/50 -mx-4 px-4 sm:-mx-8 sm:px-8 py-16 rounded-3xl">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="h-1 w-16 bg-gradient-to-r from-uptm-crimson to-uptm-gold mx-auto rounded-full"></div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-uptm-crimson bg-rose-50 px-3 py-1 rounded-full">Leadership Hierarchy</span>
                <h3 className="text-3xl font-black tracking-tight text-uptm-navy-900">Academic Excellence Sector (AES) Matrix</h3>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">Meet the executive administrators directing the pedagogical frameworks of Universiti Poly-Tech Malaysia.</p>
            </div>

            {/* Executive Layer */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20 max-w-4xl mx-auto relative">
                <div className="bg-white border-2 border-uptm-gold p-6 rounded-3xl shadow-xl w-full max-w-sm text-center group">
                    <div className="w-32 h-32 bg-slate-100 rounded-2xl mx-auto mb-5 overflow-hidden border border-slate-200">
                        <img src={directorPhoto} alt="Director" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <h4 className="text-xl font-extrabold text-uptm-navy-900">Prof. Dr. Suhaily</h4>
                    <p className="text-xs font-bold text-uptm-crimson uppercase tracking-widest mt-1">Sector Director</p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-md w-full max-w-xs text-center group">
                    <div className="w-24 h-24 bg-slate-100 rounded-xl mx-auto mb-4 overflow-hidden border border-slate-200">
                        <img src={secretariat.img} alt={secretariat.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <h5 className="text-base font-bold text-uptm-navy-900">{secretariat.name}</h5>
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">{secretariat.role}</p>
                </div>
            </div>

            {/* Grid Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {unitHeads.map((head, index) => (
                    <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden">
                        <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${head.color}`} />
                        <div className="space-y-4">
                            <div className="w-24 h-24 mx-auto mt-2 rounded-2xl overflow-hidden border border-slate-200">
                                <img src={head.img} alt={head.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <div className="text-center">
                                <h4 className="text-sm font-black text-uptm-navy-900 leading-snug group-hover:text-uptm-crimson">{head.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{head.role}</p>
                            </div>
                        </div>
                        <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                            <span className="text-[11px] font-extrabold text-slate-600 block min-h-[2rem] flex items-center justify-center">{head.unit}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}