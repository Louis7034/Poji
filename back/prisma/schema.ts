import {
    defineContract,
} from "@prisma/orm-postgres/contract-builder";

export const contract = defineContract({}, ({ field, model }) => {

    const Personnel = model("Personnel", {
        fields: {
            id: field.id.uuidv4String(),

            role: field.text(),

            prenom: field.text(),

            email: field.text().unique(),

            password: field.text(),

            createdAt: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("created_at"),
        },
    }).sql({
        table: "personnel",
    });


    const Enfant = model("Enfant", {
        fields: {
            id: field.id.uuidv4String(),

            dateArrive: field
                .column({
                    codecId: "pg/date-string@1",
                    nativeType: "date",
                } as const)
                .optional()
                .column("date_arrive"),

            createdAt: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("created_at"),
        },
    }).sql({
        table: "enfant",
    });


    const HistoireEnfant = model("HistoireEnfant", {
        fields: {
            id: field.id.uuidv4String(),

            annee: field
                .int()
                .optional(),

            histoire: field
                .text()
                .optional(),

            dateCreation: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("date_creation"),

            dateModification: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .optional()
                .column("date_modification"),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),

            enfantId: field
                .uuidString()
                .column("enfant_id"),
        },
    }).sql({
        table: "histoire_enfant",
    });


    const Presence = model("Presence", {
        fields: {
            id: field.id.uuidv4String(),

            etatPresence: field
                .text()
                .optional()
                .column("etat_presence"),

            datePresence: field
                .column({
                    codecId: "pg/date-string@1",
                    nativeType: "date",
                } as const)
                .column("date_presence"),

            heureArrivee: field
                .column({
                    codecId: "pg/time-string@1",
                    nativeType: "time",
                } as const)
                .optional()
                .column("heure_arrivee"),

            heureDepart: field
                .column({
                    codecId: "pg/time-string@1",
                    nativeType: "time",
                } as const)
                .optional()
                .column("heure_depart"),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),

            enfantId: field
                .uuidString()
                .column("enfant_id"),
        },
    }).sql({
        table: "presence",
    });


    const Journal = model("Journal", {
        fields: {
            id: field.id.uuidv4String(),

            nom: field.text(),

            createdAt: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("created_at"),

            enfantId: field
                .uuidString()
                .column("enfant_id"),
        },
    }).sql({
        table: "journal",
    });


    const TransmissionMatin = model("TransmissionMatin", {
        fields: {
            id: field.id.uuidv4String(),

            contenu: field.text().optional(),

            createdAt: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("created_at"),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),

            enfantId: field
                .uuidString()
                .column("enfant_id"),
        },
    }).sql({
        table: "transmission_matin",
    });


    const TransmissionSoir = model("TransmissionSoir", {
        fields: {
            id: field.id.uuidv4String(),

            contenu: field.text().optional(),

            createdAt: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("created_at"),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),

            enfantId: field
                .uuidString()
                .column("enfant_id"),
        },
    }).sql({
        table: "transmission_soir",
    });


    const Dejection = model("Dejection", {
        fields: {
            id: field.id.uuidv4String(),

            type: field
                .text()
                .optional(),

            date: field
                .column({
                    codecId: "pg/date-string@1",
                    nativeType: "date",
                } as const)
                .optional(),

            commentaire: field
                .text()
                .optional(),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),

            transmissionSoirId: field
                .uuidString()
                .column("transmission_soir_id"),
        },
    }).sql({
        table: "dejection",
    });


    const RappelParent = model("RappelParent", {
        fields: {
            id: field.id.uuidv4String(),

            message: field
                .text()
                .optional(),

            dateCreation: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("date_creation"),

            journeeId: field
                .uuidString()
                .optional()
                .column("journee_id"),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),
        },
    }).sql({
        table: "rappel_parent",
    });


    const ProblemeSante = model("ProblemeSante", {
        fields: {
            id: field.id.uuidv4String(),

            symptome: field
                .text()
                .optional(),

            traitement: field
                .text()
                .optional(),

            observation: field
                .text()
                .optional(),

            transmissionMatinId: field
                .uuidString()
                .optional()
                .column("transmission_matin_id"),

            transmissionSoirId: field
                .uuidString()
                .optional()
                .column("transmission_soir_id"),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),
        },
    }).sql({
        table: "probleme_sante",
    });


    const Temperature = model("Temperature", {
        fields: {
            id: field.id.uuidv4String(),

            heure: field
                .column({
                    codecId: "pg/time-string@1",
                    nativeType: "time",
                } as const)
                .optional(),

            temperature: field
                .decimal()
                .optional(),

            auteurId: field
                .uuidString()
                .optional()
                .column("auteur_id"),

            transmissionSoirId: field
                .uuidString()
                .optional()
                .column("transmission_soir_id"),

            problemeSanteId: field
                .uuidString()
                .optional()
                .column("probleme_sante_id"),
        },
    }).sql({
        table: "temperature",
    });


    const Achievement = model("Achievement", {
        fields: {
            id: field.id.uuidv4String(),

            libelle: field.text(),

            createdAt: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("created_at"),

            categorie: field.text(),
        },
    }).sql({
        table: "achievement",
    });


    const AchievementObservateur = model("AchievementObservateur", {
        fields: {
            id: field.id.uuidv4String(),

            type: field.text(),

            createdAt: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("created_at"),

        },
    }).sql({
        table: "achievement_observateur",
    });


    const AchievementObservation = model("AchievementObservation", {
        fields: {
            id: field.id.uuidv4String(),

            enfantId: field
                .uuidString()
                .column("enfant_id"),

            achievementId: field
                .uuidString()
                .column("achievement_id"),

            observateurId: field
                .uuidString()
                .column("observateur_id"),

            reponse: field.int(),

            professionnelResponse: field
                .int()
                .column("professionnel_response"),

            dateObservation: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("date_observation"),
        },
    }).sql({
        table: "achievement_observation",
    });


    const AchievementObservationQuestion = model("AchievementObservationQuestion", {
        fields: {
            id: field.id.uuidv4String(),

            categorie: field.text(),

            observation: field.text(),

            ordre: field.int(),
        },
    }).sql({
        table: "achievement_observation_question",
    });

    const AchievementObservationGenerale = model("AchievementObservationGenerale", {
        fields: {
            id: field.id.uuidv4String(),
            enfantId: field.uuidString().column("enfant_id"),
            categorie: field.text(),
            observation: field.text(),
            dateObservation: field
                .column({
                    codecId: "pg/timestamp-string@1",
                    nativeType: "timestamp",
                } as const)
                .column("date_observation"),
        },
    }).sql({
        table: "achievement_observation_generale",
    });


    return {
        models: {
            Personnel,
            Enfant,
            HistoireEnfant,
            Presence,
            Journal,
            TransmissionMatin,
            TransmissionSoir,
            Dejection,
            RappelParent,
            ProblemeSante,
            Temperature,
            Achievement,
            AchievementObservateur,
            AchievementObservation,
            AchievementObservationQuestion,
            AchievementObservationGenerale,
        },
    };
});