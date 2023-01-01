import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Icon, Tab, Transition} from "semantic-ui-react";
import {Swiper, SwiperSlide} from "swiper/react";
import MenuDisplayCard from "../components/MenuDisplayCard";
import CateringService from "../services/cateringService";
import {addDays, getFirstWeekDayOfDate} from "../utilities/dateUtils";
import {useDispatch, useSelector} from "react-redux";
import {syncCaterings, syncMainPageCaterings} from "../store/actions/cateringActions";

function SignedOutMain() {

    const cateringService = new CateringService();
    const history = useHistory();
    const dispatch = useDispatch();
    const cateringsRedux = useSelector(state => state?.caterings.cateringProps.mainPageCaterings);
    const [caterings, setCaterings] = useState(cateringsRedux);

    const firstWeekday = getFirstWeekDayOfDate(addDays(new Date(), 2));

    useEffect(() => {
        if (caterings.length > 0) return;
        cateringService.getReservationPageData(firstWeekday, addDays(firstWeekday, 5), 15).then(response => {
            setCaterings(response.data.data.content)
            dispatch(syncMainPageCaterings(response.data.data.content))
        })
    }, [])

    const mealOption = (menuItem, caterings) => {
        return {
            menuItem: menuItem,
            render: () =>
                <Swiper spaceBetween={(window.innerWidth / 30) + 25} className="p-4"
                        slidesPerView={Math.ceil(window.innerWidth / 550)}>
                    {caterings.map(c =>
                        <SwiperSlide><MenuDisplayCard date={new Date(c.date)} menuItems={c.menuItems}/></SwiperSlide>
                    )}
                </Swiper>
        }
    }

    const mealPanes = [
        mealOption(
            {
                key: 'lunch',
                icon: <Icon name="sun" color="yellow"/>,
                content: <span className="text-white">Öğle</span>,
            },
            caterings.filter(c => c.meal.id === 2)),
        mealOption({
                key: 'dinner',
                icon: <Icon name="moon" color="grey"/>,
                content: <span className="text-white">Akşam</span>
            },
            caterings.filter(c => c.meal.id === 3))
    ]

    return (
        <div id="main-page-container">
            <header className="shadow">
                <div className="overlay">
                    <h1 className="hand-writing">Hosgeldiniz</h1>
                    <span>Yemek rezervasyonu yapmak için lütfen giriş yapınız.</span>
                    <br/>
                    <button className="login-button" onClick={() => history.push("/login")}>
                        <strong>Giriş Yap</strong>
                    </button>
                </div>
            </header>

            <Transition visible={caterings.length > 0} duration={500} animation={"bounce"}>
                <section id="menu-cards" className="p-2 p-lg-5 py-5 mx-3 mx-lg-5">
                    <Tab menu={{secondary: true, pointing: true, text: true}} panes={mealPanes}/>
                </section>
            </Transition>

            <section id="announcements" className="main-page-section p-2 p-lg-5 py-5 mx-3 mx-lg-5">
                <h2 className="scroll-to-section text-center">Duyurular</h2>
                <br/>
                <div className="border-0">
                    <div className="content">
                        <p>Değerli öğrencilerimiz,</p>
                        <p>
                            3 Ekim 2022 Pazartesi günü itibariyle öğrencilerimiz için yemek
                            hizmetinin verildiği yemekhaneler aşağıdaki tabloda belirtilmiştir.
                        </p>
                        <br/>
                        <table className="table">
                            <thead>
                            <tr style={{borderBottom: 2}}>
                                <th>Öğün</th>
                                <th>Öğün Saati</th>
                                <th>Hizmetin verildiği yemekhane</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Öğle Yemeği</th>
                                <td>11:30 - 14:00</td>
                                <td>
                                    <p>Porsuk Meslek Yüksekokulu Öğrenci Yemekhanesi, 2 Eylül Öğrenci Yemekhanesi</p>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">Akşam Yemeği</th>
                                <td>
                                    <p>17:30 - 20:00</p>
                                </td>
                                <td>
                                    <p>Eskişehir Teknik Üniversitesi 2 Eylül Öğrenci Yemekhanesi</p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="main-page-section p-0 p-lg-5 py-5 mx-3 mx-lg-5" id="video">
                <div className="container">
                    <h1 className="text-center">Otomasyon Kullanım Videosu</h1>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe height="500" src="https://www.youtube.com/embed/wPz_cpAjMXE" width="100%"/>
                    </div>
                </div>
            </section>

            <section id="map" className="mx-3 mx-lg-5">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25978.169857889396!2d30.497519157205023!3d39.80663130133433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9380c5b022cfb0ef!2zRXNracWfZWhpciBUZWtuaWsgw5xuaXZlcnNpdGVzaSDEsGtpZXlsw7xsIEthbXDDvHPDvCBZZW1la2hhbmVzaQ!5e0!3m2!1str!2str!4v1669216596000!5m2!1str!2str"
                    allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </section>

            <section id="feedback" className="mx-3 mx-lg-5">
                <div className="row">
                    <div className="col-lg-9 align-self-center">
                        <form className="main-page-section m-0 me-lg-1">
                            <div>
                                <h2 className="mx-3">Dilek, Öneri, Şikayet</h2>
                                <div className="d-flex justify-content-between">
                                    <input name="name" type="text" id="name" placeholder="İsim Soyisim"
                                           required className="form-control"/>
                                    <input name="email" type="email" id="email"
                                           placeholder="Email"
                                           required className="form-control"/>
                                    <input name="subject" type="text" id="subject" placeholder="Konu"
                                           required className="form-control"/>
                                </div>
                                <textarea name="message" className="form-control"
                                          placeholder="Mesajınız..." required></textarea>
                                <button type="submit" id="form-submit" className="button login-button" onClick={null}>
                                    Mesajı gönder
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-3">
                        <div className="right-info m-0 ms-lg-1 main-page-section d-flex">
                            <div className="d-flex justify-content-around flex-column w-100">
                                <div className="info border-bottom-1">
                                    <h5><Icon name="phone"/> Telefon</h5>
                                    <a href="tel:2223211354">(222) 321 35 50 / 1354</a>
                                </div>
                                <div className="info mt-2 mt-lg-0">
                                    <h5><Icon name="envelope outline"/> Email Adresi</h5>
                                    <a href="mailto:yemekhane@eskisehir.edu.tr">yemekhane@eskisehir.edu.tr</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignedOutMain;