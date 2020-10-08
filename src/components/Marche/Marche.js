import React from "react";
import { connect } from 'react-redux';
import "./Marche.css";

import { newId, download, formattedDate } from "../../utils/utils.js";
import { setStore, compute, clearStore } from "../../store/marche.js";
import { DAYS } from "../../utils/constants.js";
import NavBar from "../NavBar/NavBar.js";
import Popups from "../Popups/Popups.js";
import PageData from "../PageData/PageData.js";
import DayForm from "../DayForm/DayForm.js";
import EventForm from "../EventForm/EventForm.js";
import HelpBox from "../HelpBox/HelpBox.js";
import FileInput from "../FileInput/FileInput.js";

class Marche extends React.Component {
    constructor(props) {
        super();
        this.state = {
            // Buttons with confirm
            resetRequested: false, // toggle for the confirm/cancel buttons for removing files
            loadRequested: false,
            saveRequested: false,
            // Displays
            showForm: false, // toggle for the accounting/event input form
            showDayForm: false, // false or DAYS[*]
            showHelp: false, // toggle the "help" box
            // POPUPS
            popupIds: [],
            popups: {}, // {content, type}
        };
    }

    async componentDidMount() {
        window.addEventListener('beforeunload', this.onClose);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onClose);
    }

    ////////////////// //////// //////////////////
    ////////////////// PRIVATE ///////////////////
    ////////////////// //////// //////////////////

    /**
     * Loads the save from the localStorage.
     *
     * @param {String} saveName
     */
    _loadSave = (saveName) => {
        const saved = localStorage.getItem(saveName);
        if (saved) {
            this.props.setStore(JSON.parse(saved));
        }
        this._addMessage(
            "Chargé",
            "La dernière sauvegarde à été chargée",
            "info",
            2000
        );
    };
    /**
     *
     * @param {blob} blob
     * @return {file}
     */
    _readFile = async (blob) => {
        try {
            const reader = new FileReader();
            reader.readAsText(blob);
            return new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve(reader.result);
                };
            });
        } catch (error) {
            this._addMessage("ERREUR", error.message, "error");
            return false;
        }
    };
    /**
     * Saves part of the state to the localStorage.
     *
     * @param {String} saveName
     */
    _saveState = (saveName) => {
        const store = this.props.store;
        localStorage.setItem(
            saveName,
            JSON.stringify({
                days: store.days,
                suppliers: store.suppliers,
                missedPaymentsByDay: store.missedPaymentsByDay,
                missedTransactionsByDay: store.missedTransactionsByDay,
                supplierTotal: store.supplierTotal,
                supplierRealGain: store.supplierRealGain,
                daysRawData: store.daysRawData,
                eventExpenses: store.eventExpenses,
                dailyAccounting: store.dailyAccounting,
                ticketPrice: store.ticketPrice,
                costTotal: store.costTotal,
            })
        );
    };

    /**
     *
     * @param {String} title
     * @param {String} content text content of the message
     * @param {String} [type] info | error
     * @param {Number} [duration] amount of ms
     */
    _addMessage = async (title, content, type='info', duration=5000) => {
        const id = newId("message");
        await this.setState({
            popupIds: this.state.popupIds.concat(id),
            popups: Object.assign({}, this.state.popups, {
                [id]: {
                    title,
                    content,
                    type,
                },
            }),
        });
        setTimeout(async () => {
            const newPopupIds = this.state.popupIds.filter((filterId) => {
                return filterId !== id;
            });
            const newPopups = Object.assign({}, this.state.popups);
            delete newPopups[id];
            await this.setState({
                popupIds: newPopupIds,
                popups: newPopups,
            });
        }, duration);
    };
    /**
     *
     * @param {Blob} file
     */
    _openFile = async (file) => {
        if (file.type !== 'application/json') {
            this._addMessage(
                "ERREUR",
                "Le fichier n'est pas un de type .json",
                "error"
                );
            return false;
        }
        const save = await this._readFile(file);
        const saveObject = JSON.parse(save);
        if (Object.keys(saveObject).includes('daysRawData')) {
            await this.props.setStore(saveObject);
            await this._addMessage(
                "Chargé",
                "Le fichier a bien été chargé",
                "info",
                2000
            );
            await this.props.compute();
            return true;
        } else {
            this._addMessage(
                "ERREUR",
                "Le fichier n'a pas pu être chargé",
                "error"
            );
            return false;
        }
    }

    ////////////////// //////// //////////////////
    ////////////////// HANDLERS //////////////////
    ////////////////// //////// //////////////////

    /**
     *
     */
    clearAll = async () => {
        this.props.clearStore();
        await this._addMessage(
            "",
            "Tout le contenu a été réinitialisé",
            "error",
            5000
        );
        await this.toggleReset();
    };
    onClickLoad = async () => {
        this._loadSave('saved-state-manual');
        await this.toggleLoad();
    }
    onClickSave = () => {
        this._saveState('saved-state-manual');
        this._addMessage(
            "Sauvegardé",
            "Les informations ont été sauvegardées",
            "info",
            3000
        );
        this.toggleSave();
    }
    onClickSaveFile = () => {
        const data = JSON.stringify({
            daysRawData: this.props.store.daysRawData,
            eventExpenses: this.props.store.eventExpenses,
            dailyAccounting: this.props.store.dailyAccounting,
            ticketPrice: this.props.store.ticketPrice,
            costTotal: this.props.store.costTotal,
        })
        download(
            data,
            `marche-de-noel-${formattedDate()}.json`,
            'application/json'
        );
        this.toggleSave();
    }
    onClose = () => {
        this._saveState('saved-store-auto');
    }
    /**
     *
     * @param {DropEvent} event
     */
    onDrop = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const dt = event.dataTransfer;
        if (!dt || !dt.types.includes('Files')) {
            return;
        } else {
            await this._openFile(dt.files[0]);
        }
        this.setState({ isDragHover: false });
    }
    /**
     * Handles the change in the file input that is used to load a saved .json file.
     *
     * @param {Blob} file
     */
    onFileInputChange = async (files) => {
        const file = files[0];
        const success = await this._openFile(file);
        if (success) {
            await this.toggleLoad();
        }
    }
    /**
     *
     * @param {mouseEvent} e
     */
    onFileInputWrapperClick = (e) => {
        // allows clicking on the file input from the outside element.
        if (e.currentTarget !== e.target) {
            return;
        }
        const input = e.currentTarget.getElementsByTagName("input");
        if (input.length) {
            e.stopPropagation();
            input[0].click();
        }
    };
    /**
     *
     * @param {String} day
     */
    toggleDay = async (day) => {
        const isSameDay = this.state.showDayForm === day;
        await this.setState({ showDayForm: false, showForm: false });
        if (!isSameDay) {
            await this.setState({ showDayForm: day });
        }
    };
    toggleEventForm = async () => {
        const isOpen = this.state.showForm;
        await this.setState({ showForm: !isOpen, showDayForm: false });
        if (isOpen) {
            this.props.compute();
        }
    };
    toggleHelp = async () => {
        await this.setState({ showHelp: !this.state.showHelp });
    };
    toggleLoad = async () => {
        await this.setState({ loadRequested: !this.state.loadRequested });
    };
    toggleReset = async () => {
        await this.setState({ resetRequested: !this.state.resetRequested });
    };
    toggleSave = () => {
        this.setState({ saveRequested: !this.state.saveRequested });
    };

    ////////////////// //////// //////////////////
    ///////////////////// DOM ////////////////////
    ////////////////// //////// //////////////////

    /**
     * Generates the buttons to be given to the top nav-bar.
     *
     * @returns {Array} buttons
     */
    _getButtons() {
        // ACCOUNTING
        const buttons = [
            {
                className: (this.state.showForm ? "active" : "") + " purple",
                fa: "fa-eur",
                content: "Comptabilité",
                callBack: this.toggleEventForm,
            },
        ];

        // ADD DAYS
        for (const day of DAYS) {
            buttons.push({
                className:
                    (this.state.showDayForm === day ? "active " : "") +
                    ((this.props.store.daysRawData[day] && this.props.store.daysRawData[day].customers.length)
                        ? "green"
                        : "alert"),
                fa: "fa-calendar",
                callBack: () => {
                    this.toggleDay(day);
                },
                content: day,
            });
        }

        // RIGHT
        buttons.push({
            content: "Aide",
            fa: "fa-info-circle",
            className: ("blue order-2 ml-auto " + (!!this.state.showHelp && 'active')),
            callBack: this.toggleHelp,
        });

        // REMOVE FILES
        if (!(this.state.saveRequested || this.state.loadRequested)) {
            let resetButtons = [
                {
                    content: "Tout effacer",
                    fa: "fa-trash",
                    className: "warning",
                    callBack: this.toggleReset,
                },
            ];
            if (this.state.resetRequested) {
                resetButtons = [
                    {
                        content: "Annuler",
                        fa: "fa-times",
                        className: "green",
                        callBack: this.toggleReset,
                    },
                    {
                        content: "Confirmer: Effacer l'encodage en cours",
                        fa: "fa-check",
                        className: "alert",
                        callBack: this.clearAll,
                    },
                ];
            }
            buttons.push(...resetButtons);
        }

        // SAVE
        let saveButtons = [
            {
                content: "Sauvegarder",
                fa: "fa-floppy-o",
                className: "green order-2",
                callBack: this.toggleSave,
            },
        ];
        if (this.state.saveRequested) {
            saveButtons = [
                {
                    content: "Annuler",
                    fa: "fa-times",
                    className: "alert",
                    callBack: this.toggleSave,
                },
                {
                    content: "Sauvegarde locale",
                    fa: "fa-cloud-download",
                    className: "warning",
                    callBack: this.onClickSave,
                },
                {
                    content: "Télécharger la sauvegarde",
                    fa: "fa-download",
                    className: "warning",
                    callBack: this.onClickSaveFile,
                },
            ];
        }
        if (!this.state.loadRequested) {
            buttons.push(...saveButtons);
        }

        // LOAD
        let loadButtons = [
            {
                content: "Charger",
                fa: "fa-upload",
                className: "green order-2",
                callBack: this.toggleLoad,
            },
        ];
        if (this.state.loadRequested) {
            loadButtons = [
                {
                    content: "Annuler",
                    fa: "fa-times",
                    className: "alert",
                    callBack: this.toggleLoad,
                },
                {
                    content: "Charger sauvegarde locale",
                    fa: "fa-cloud-upload",
                    className: "warning",
                    callBack: this.onClickLoad,
                },
                {
                    fa: "fa-upload",
                    className: "warning",
                    callBack: (e) => this.onFileInputWrapperClick(e),
                    content: (<FileInput label={`"Charger depuis un fichier .JSON"`} className="noselect" value={undefined} onChange={this.onFileInputChange} />)
                },
            ];
        }
        if (!this.state.saveRequested) {
            buttons.push(...loadButtons);
        }
        return buttons;
    }

    render() {
        return (
            <div
                className='marche-page'
                onDrop={(e) => this.onDrop(e)}
                onDragOver={
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            >
                <NavBar buttons={this._getButtons()} />
                {!!this.state.popupIds.length && (
                    <Popups
                        messageIds={this.state.popupIds}
                        messages={this.state.popups}
                    />
                )}
                {!!this.state.showHelp && (
                    <HelpBox/>
                )}
                {!!DAYS.includes(this.state.showDayForm) && (
                    <DayForm
                        day={this.state.showDayForm}
                        addMessage={this._addMessage}
                    />
                )}
                {!!this.state.showForm && (
                    <EventForm/>
                )}
                <PageData
                    openDay={this.state.showDayForm}
                />
            </div>
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        store: store.marche,
    }
}
const mapDispatchToProps = () => {
    return { setStore, compute, clearStore };
}

export default connect(mapStoreToProps, mapDispatchToProps())(Marche);
