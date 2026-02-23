import React from "react";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const SosButton = () => {
    const { triggerSos } = useAuth();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="lg"
                    className="rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-transform bg-red-600 hover:bg-red-700"
                >
                    <AlertCircle className="w-8 h-8 text-white animate-pulse" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold text-red-500">EMERGENCY SOS</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-300">
                        Are you sure you want to trigger an emergency SOS alert?
                        This will immediately notify college administrators with your details and current bus information.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={triggerSos}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        CONFIRM EMERGENCY
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
