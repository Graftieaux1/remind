"use client";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddPatientDialog() {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [numBoitier, setNumBoitier] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const addPatient = async (nom: string, prenom: string, numBoitier: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .insert({ nom, prenom, num_boitier: numBoitier });
    if (error) {
      console.error(error);
    } else {
      setOpen(false);
      setNom("");
      setPrenom("");
      setNumBoitier("");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 w-full px-4 md:w-1/2">
        <DialogHeader>
          <DialogTitle>Ajouter un patient</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Nom :</p>
          <Input
            placeholder="Nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Prénom :</p>
          <Input
            placeholder="Prénom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Numéro de boîtier :</p>
          <Input
            placeholder="Numéro de boîtier"
            onChange={(e) => setNumBoitier(e.target.value)}
            value={numBoitier}
          />
        </div>
        <Button
          disabled={loading || nom === "" || prenom === "" || numBoitier === ""}
          onClick={() => {
            addPatient(nom, prenom, numBoitier);
          }}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Ajouter"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
