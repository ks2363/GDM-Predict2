
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Create a schema for form validation
const formSchema = z.object({
  age: z.string().min(1, "Age is required"),
  pregnancyCount: z.string().min(1, "Number of pregnancies is required"),
  previousGestationPeriod: z.string(),
  bmi: z.string().min(1, "BMI is required"),
  hdl: z.string().min(1, "HDL is required"),
  familyHistory: z.string().min(1, "Family history is required"),
  prenatalLoss: z.string().min(1, "Prenatal loss information is required"),
  birthDefects: z.string().min(1, "Birth defects information is required"),
  pcos: z.string().min(1, "PCOS information is required"),
  systolicBP: z.string().min(1, "Systolic blood pressure is required"),
  diastolicBP: z.string().min(1, "Diastolic blood pressure is required"),
  glucoseLevels: z.string().min(1, "Glucose levels are required"),
  hemoglobin: z.string().min(1, "Hemoglobin is required"),
  physicalActivity: z.string().min(1, "Physical activity information is required"),
  prediabetes: z.string().min(1, "Prediabetes information is required"),
});

type FormData = z.infer<typeof formSchema>;

interface PredictionFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const PredictionForm = ({ onSubmit, isLoading = false }: PredictionFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      pregnancyCount: "1",
      previousGestationPeriod: "0",
      bmi: "",
      hdl: "50",
      familyHistory: "no",
      prenatalLoss: "no",
      birthDefects: "no",
      pcos: "no",
      systolicBP: "120",
      diastolicBP: "80",
      glucoseLevels: "",
      hemoglobin: "13",
      physicalActivity: "medium",
      prediabetes: "no",
    },
  });

  const handleSubmit = (values: FormData) => {
    onSubmit(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 lg:p-8"
    >
      <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-6">Enter Your Health Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Your age in years" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Pregnancy Count */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="pregnancyCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Pregnancies</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Number of pregnancies" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Previous Gestation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <FormField
                control={form.control}
                name="previousGestationPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gestation Period in Previous Pregnancy</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="In months (0 if first pregnancy)" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* BMI */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="bmi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BMI (Body Mass Index)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Your BMI" 
                        step="0.1"
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* HDL */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <FormField
                control={form.control}
                name="hdl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HDL Cholesterol</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="mg/dL" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Systolic BP */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="systolicBP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Systolic Blood Pressure</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="mmHg" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Diastolic BP */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <FormField
                control={form.control}
                name="diastolicBP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diastolic Blood Pressure</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="mmHg" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Glucose Levels */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="glucoseLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Glucose Levels (OGTT)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="mg/dL" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>Oral Glucose Tolerance Test result</FormDescription>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Hemoglobin */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.45 }}
            >
              <FormField
                control={form.control}
                name="hemoglobin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hemoglobin</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="g/dL" 
                        step="0.1"
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Family History */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="familyHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family History of Diabetes</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select yes/no" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Prenatal Loss */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            >
              <FormField
                control={form.control}
                name="prenatalLoss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>History of Unexplained Prenatal Loss</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select yes/no" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Birth Defects */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <FormField
                control={form.control}
                name="birthDefects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Large Child or Birth Defects</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select yes/no" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* PCOS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.65 }}
            >
              <FormField
                control={form.control}
                name="pcos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PCOS (Polycystic Ovary Syndrome)</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select yes/no" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Physical Activity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <FormField
                control={form.control}
                name="physicalActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Physical Activity Level</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Prediabetes */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.75 }}
            >
              <FormField
                control={form.control}
                name="prediabetes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prediabetes Diagnosis</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select yes/no" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="pt-4"
          >
            <button
              type="submit"
              className="btn-primary w-full flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                "Predict GDM Risk"
              )}
            </button>
            <p className="text-xs text-gdm-gray mt-2 text-center">
              Your data is processed locally and not stored on any servers.
            </p>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default PredictionForm;
