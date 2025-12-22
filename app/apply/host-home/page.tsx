"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Send, Trash2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ALL_US_REGIONS } from "@/lib/constant"

export default function HostHomeApplicationPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneHome: "",
        phoneWork: "",
        phoneCell: "",
        email: "",
        streetAddress: "",
        addressLine2: "",
        city: "",
        state: "Colorado",
        zipCode: "",
        elPasoResident: "",
        driversLicense: "",
        householdMembers: [{ name: "", dateOfBirth: "", relationship: "" }],
        workedAsHostHome: "",
        licensedForDayCare: "",
        anyoneBeenHostHome: "",
        schedule: {
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
        },
        primaryLanguage: "",
        otherLanguages: "",
        proficientSignLanguage: "",
        educationLevel: "",
        certifications: [{ certification: "", date: "" }],
        training: [{ date: "", class: "", presenter: "" }],
        signature: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = useCallback((field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }, [])

    const handleScheduleChange = useCallback((day: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            schedule: { ...prev.schedule, [day]: value },
        }))
    }, [])

    const addHouseholdMember = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            householdMembers: [...prev.householdMembers, { name: "", dateOfBirth: "", relationship: "" }],
        }))
    }, [])

    const removeHouseholdMember = useCallback((index: number) => {
        setFormData((prev) => ({
            ...prev,
            householdMembers: prev.householdMembers.filter((_, i) => i !== index),
        }))
    }, [])

    const addCertification = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            certifications: [...prev.certifications, { certification: "", date: "" }],
        }))
    }, [])

    const removeCertification = useCallback((index: number) => {
        setFormData((prev) => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index),
        }))
    }, [])

    const addTraining = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            training: [...prev.training, { date: "", class: "", presenter: "" }],
        }))
    }, [])

    const removeTraining = useCallback((index: number) => {
        setFormData((prev) => ({
            ...prev,
            training: prev.training.filter((_, i) => i !== index),
        }))
    }, [])

    const generatePDF = useCallback(async () => {
        const jsPDF = (await import("jspdf")).default
        const doc = new jsPDF()

        let yPosition = 20
        const lineHeight = 7
        const pageHeight = doc.internal.pageSize.height

        const checkNewPage = () => {
            if (yPosition > pageHeight - 20) {
                doc.addPage()
                yPosition = 20
            }
        }

        // Header
        doc.setFontSize(18)
        doc.setFont("helvetica", "bold")
        doc.text("Host Home Provider Application", 105, yPosition, { align: "center" })
        yPosition += 10

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text("Nissi Home Health Care", 105, yPosition, { align: "center" })
        yPosition += 5
        doc.text("15290 E 6th Ave, Unit 210D, Aurora, CO 80011-0593", 105, yPosition, { align: "center" })
        yPosition += 10

        // Personal Information
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("PERSONAL INFORMATION", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Phone (Home): ${formData.phoneHome}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Phone (Work): ${formData.phoneWork}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Phone (Cell): ${formData.phoneCell}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Email: ${formData.email}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Address: ${formData.streetAddress}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        if (formData.addressLine2) {
            doc.text(`Address Line 2: ${formData.addressLine2}`, 20, yPosition)
            yPosition += lineHeight
            checkNewPage()
        }

        doc.text(`City: ${formData.city}, State: ${formData.state}, ZIP: ${formData.zipCode}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`El Paso County Resident: ${formData.elPasoResident}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Driver's License #: ${formData.driversLicense}`, 20, yPosition)
        yPosition += 10
        checkNewPage()

        // Household Members
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("HOUSEHOLD MEMBERS", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        formData.householdMembers.forEach((member, index) => {
            if (member.name || member.dateOfBirth) {
                checkNewPage()
                doc.text(`Member ${index + 1}:`, 20, yPosition)
                yPosition += lineHeight
                checkNewPage()
                if (member.name) {
                    doc.text(`  Name: ${member.name}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (member.dateOfBirth) {
                    doc.text(`  Date of Birth: ${member.dateOfBirth}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (member.relationship) {
                    doc.text(`  Relationship: ${member.relationship}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
            }
        })
        yPosition += 5

        // Background Check Section
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("BACKGROUND CHECK INFORMATION", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Worked as Host Home Provider: ${formData.workedAsHostHome}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Licensed for Foster/Day Care: ${formData.licensedForDayCare}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Anyone in Household Been Host Home Provider: ${formData.anyoneBeenHostHome}`, 20, yPosition)
        yPosition += 10
        checkNewPage()

        // Daily Schedule
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("DAILY SCHEDULE", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        Object.entries(formData.schedule).forEach(([day, hours]) => {
            if (hours) {
                checkNewPage()
                doc.text(`${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`, 20, yPosition)
                yPosition += lineHeight
            }
        })
        yPosition += 5
        checkNewPage()

        // Language Information
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("LANGUAGE PROFICIENCY", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Primary Language: ${formData.primaryLanguage}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Other Languages: ${formData.otherLanguages}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Proficient in Sign Language: ${formData.proficientSignLanguage}`, 20, yPosition)
        yPosition += 10
        checkNewPage()

        // Education & Training
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("EDUCATION & TRAINING", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Education Level: ${formData.educationLevel}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        if (formData.certifications.some((cert) => cert.certification)) {
            yPosition += 5
            doc.setFont("helvetica", "bold")
            doc.text("Certifications:", 20, yPosition)
            yPosition += lineHeight
            doc.setFont("helvetica", "normal")

            formData.certifications.forEach((cert, index) => {
                if (cert.certification) {
                    checkNewPage()
                    doc.text(`  ${cert.certification} (${cert.date})`, 25, yPosition)
                    yPosition += lineHeight
                }
            })
        }

        if (formData.training.some((t) => t.class)) {
            yPosition += 5
            checkNewPage()
            doc.setFont("helvetica", "bold")
            doc.text("Training:", 20, yPosition)
            yPosition += lineHeight
            doc.setFont("helvetica", "normal")

            formData.training.forEach((t, index) => {
                if (t.class) {
                    checkNewPage()
                    doc.text(`  ${t.date}: ${t.class} - ${t.presenter}`, 25, yPosition)
                    yPosition += lineHeight
                }
            })
        }

        // Signature
        yPosition += 10
        checkNewPage()
        if (formData.signature) {
            doc.text(`Signature: ${formData.signature}`, 20, yPosition)
            yPosition += lineHeight
        }

        // Footer
        checkNewPage()
        yPosition += 10
        doc.setFontSize(8)
        doc.text("Nissi Home Health Care - 720-594-0593, 678-267-9117", 105, yPosition, { align: "center" })

        return doc
    }, [formData])

    const handleDownloadPDF = useCallback(async () => {
        const doc = await generatePDF()
        doc.save(`${formData.lastName || "host-home"}-application.pdf`)
    }, [generatePDF, formData.lastName])

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Generate PDF
            const doc = await generatePDF()
            const pdfBlob = doc.output("blob")

            // Download PDF
            const url = URL.createObjectURL(pdfBlob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${formData.lastName}-host-home-application.pdf`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            // Prepare email content
            const emailSubject = encodeURIComponent(
                "Host Home Provider Application - " + formData.firstName + " " + formData.lastName,
            )
            const emailBody = encodeURIComponent(
                `Please find attached my host home provider application.\n\n` +
                `Name: ${formData.firstName} ${formData.lastName}\n` +
                `Email: ${formData.email}\n` +
                `Phone: ${formData.phoneHome}\n\n` +
                `Application details are included in the attached PDF.`,
            )

            // Try to open mailto
            const mailtoLink = `mailto:nissihomehealth@yahoo.com?bcc=nissihomehealth@gmail.com&subject=${emailSubject}&body=${emailBody}`
            window.location.href = mailtoLink
        } catch (error) {
            console.error("Error submitting application:", error)
        } finally {
            setIsSubmitting(false)
        }
    }, [generatePDF, formData])

    return (
        <div className="min-h-screen bg-secondary/95">
            <Header />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-card rounded-lg shadow-lg p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Host Home Provider Application</h1>
                        <p className="text-muted-foreground">
                            Join our team of compassionate caregivers and make a difference in someone's life.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Personal Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                                PERSONAL INFORMATION
                            </h2>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="phoneHome">Phone (Home)</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="phoneHome"
                                            type="tel"
                                            value={formData.phoneHome}
                                            onChange={(e) => handleInputChange("phoneHome", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phoneWork">Phone (Work)</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="phoneWork"
                                            type="tel"
                                            value={formData.phoneWork}
                                            onChange={(e) => handleInputChange("phoneWork", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phoneCell">Phone (Cell)</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="phoneCell"
                                            type="tel"
                                            value={formData.phoneCell}
                                            onChange={(e) => handleInputChange("phoneCell", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email">
                                        Email <span className="text-destructive">(Required)</span>
                                    </Label>
                                    <Input
                                        className="mt-2 border border-primary/40"
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="streetAddress">Street Address</Label>
                                    <Input
                                        className="mt-2 border border-primary/40"
                                        id="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="addressLine2">Address Line 2</Label>
                                    <Input
                                        className="mt-2 border border-primary/40"
                                        id="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange("city", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State</Label>
                                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                                            <SelectTrigger className="mt-2 border border-primary/40 w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ALL_US_REGIONS.map((state) => (
                                                    <SelectItem key={state.label} value={state.label}>
                                                        {state.label}
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input
                                        className="mt-2 border border-primary/40"
                                        id="zipCode"
                                        value={formData.zipCode}
                                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="mb-3 block">Do you reside in El Paso County?</Label>
                                    <RadioGroup
                                        value={formData.elPasoResident}
                                        onValueChange={(value) => handleInputChange("elPasoResident", value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="Yes" id="elpaso-yes" />
                                            <Label htmlFor="elpaso-yes" className="font-normal cursor-pointer">
                                                Yes
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="No" id="elpaso-no" />
                                            <Label htmlFor="elpaso-no" className="font-normal cursor-pointer">
                                                No
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label htmlFor="driversLicense">Driver's License #</Label>
                                    <Input
                                        className="mt-2 border border-primary/40"
                                        id="driversLicense"
                                        value={formData.driversLicense}
                                        onChange={(e) => handleInputChange("driversLicense", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label className="mb-3 block">
                                        Name of other individuals currently living in your home: (If individual in services do not list name
                                        or DOB)
                                    </Label>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Click the + sign at the end of the row to add additional lines.
                                    </p>
                                    <div className="space-y-4">
                                        {formData.householdMembers.map((member, index) => (
                                            <div key={index} className="grid md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg relative">
                                                {formData.householdMembers.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeHouseholdMember(index)}
                                                        className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <div>
                                                    <Label htmlFor={`member-name-${index}`}>Name</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`member-name-${index}`}
                                                        value={member.name}
                                                        onChange={(e) => {
                                                            const newMembers = [...formData.householdMembers]
                                                            newMembers[index].name = e.target.value
                                                            handleInputChange("householdMembers", newMembers)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`member-dob-${index}`}>Date of Birth</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`member-dob-${index}`}
                                                        type="date"
                                                        value={member.dateOfBirth}
                                                        onChange={(e) => {
                                                            const newMembers = [...formData.householdMembers]
                                                            newMembers[index].dateOfBirth = e.target.value
                                                            handleInputChange("householdMembers", newMembers)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`member-relationship-${index}`}>Relationship</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`member-relationship-${index}`}
                                                        value={member.relationship}
                                                        onChange={(e) => {
                                                            const newMembers = [...formData.householdMembers]
                                                            newMembers[index].relationship = e.target.value
                                                            handleInputChange("householdMembers", newMembers)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addHouseholdMember}
                                            className="w-full bg-transparent"
                                        >
                                            + Add Another Household Member
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Background Check Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                                A BACKGROUND CHECK IS REQUIRED FOR ALL ADULTS LIVING WITHIN A HOST HOME
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <Label className="mb-3 block">Have you ever worked as a Host Home Provider before?</Label>
                                    <RadioGroup
                                        value={formData.workedAsHostHome}
                                        onValueChange={(value) => handleInputChange("workedAsHostHome", value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="Yes" id="worked-yes" />
                                            <Label htmlFor="worked-yes" className="font-normal cursor-pointer">
                                                Yes
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="No" id="worked-no" />
                                            <Label htmlFor="worked-no" className="font-normal cursor-pointer">
                                                No
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label className="mb-3 block">
                                        Are you currently licensed to provide foster/day care in your home?
                                    </Label>
                                    <RadioGroup
                                        value={formData.licensedForDayCare}
                                        onValueChange={(value) => handleInputChange("licensedForDayCare", value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="Yes" id="licensed-yes" />
                                            <Label htmlFor="licensed-yes" className="font-normal cursor-pointer">
                                                Yes
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="No" id="licensed-no" />
                                            <Label htmlFor="licensed-no" className="font-normal cursor-pointer">
                                                No
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label className="mb-3 block">
                                        Have you or anyone in your household ever been a host home provider?
                                    </Label>
                                    <RadioGroup
                                        value={formData.anyoneBeenHostHome}
                                        onValueChange={(value) => handleInputChange("anyoneBeenHostHome", value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="Yes" id="anyone-yes" />
                                            <Label htmlFor="anyone-yes" className="font-normal cursor-pointer">
                                                Yes
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="No" id="anyone-no" />
                                            <Label htmlFor="anyone-no" className="font-normal cursor-pointer">
                                                No
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label className="mb-3 block">
                                        Please provide your daily schedule, including hours worked and on-going commitments (include
                                        classes, clubs, meetings, etc.)
                                    </Label>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Click the + sign at the end of the row to add additional lines
                                    </p>
                                    <div className="space-y-3">
                                        {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
                                            <div key={day} className="grid grid-cols-4 gap-4 items-center">
                                                <Label className="capitalize">{day}</Label>
                                                <Input
                                                    className="mt-2 border border-primary/40 col-span-3"
                                                    placeholder="Hours/Activities"
                                                    value={formData.schedule[day as keyof typeof formData.schedule]}
                                                    onChange={(e) => handleScheduleChange(day, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="primaryLanguage">What is your primary language spoken in the home?</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="primaryLanguage"
                                            value={formData.primaryLanguage}
                                            onChange={(e) => handleInputChange("primaryLanguage", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="otherLanguages">Indicate any other language you speak fluently.</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="otherLanguages"
                                            value={formData.otherLanguages}
                                            onChange={(e) => handleInputChange("otherLanguages", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label className="mb-3 block">Are you proficient in sign language?</Label>
                                        <RadioGroup
                                            value={formData.proficientSignLanguage}
                                            onValueChange={(value) => handleInputChange("proficientSignLanguage", value)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem className="border border-primary/40" value="Yes" id="sign-yes" />
                                                <Label htmlFor="sign-yes" className="font-normal cursor-pointer">
                                                    Yes
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem className="border border-primary/40" value="No" id="sign-no" />
                                                <Label htmlFor="sign-no" className="font-normal cursor-pointer">
                                                    No
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Education & Training */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                                EDUCATION & TRAINING
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="educationLevel">What is the Highest Level of education you have completed?</Label>
                                    <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange("educationLevel", value)}>
                                        <SelectTrigger className="mt-2 border border-primary/40 w-full">
                                            <SelectValue placeholder="Select education level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High School">High School</SelectItem>
                                            <SelectItem value="Some College">Some College</SelectItem>
                                            <SelectItem value="Associate Degree">Associate Degree</SelectItem>
                                            <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                                            <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                                            <SelectItem value="Doctoral Degree">Doctoral Degree</SelectItem>
                                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="mb-3 block">List any special certifications in related fields.</Label>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Click the + sign at the end of the row to add additional certifications
                                    </p>
                                    <div className="space-y-4">
                                        {formData.certifications.map((cert, index) => (
                                            <div key={index} className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg relative">
                                                {formData.certifications.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeCertification(index)}
                                                        className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <div>
                                                    <Label htmlFor={`cert-name-${index}`}>Certification</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`cert-name-${index}`}
                                                        value={cert.certification}
                                                        onChange={(e) => {
                                                            const newCerts = [...formData.certifications]
                                                            newCerts[index].certification = e.target.value
                                                            handleInputChange("certifications", newCerts)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`cert-date-${index}`}>Date</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`cert-date-${index}`}
                                                        type="date"
                                                        value={cert.date}
                                                        onChange={(e) => {
                                                            const newCerts = [...formData.certifications]
                                                            newCerts[index].date = e.target.value
                                                            handleInputChange("certifications", newCerts)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addCertification}
                                            className="w-full bg-transparent"
                                        >
                                            + Add Another Certification
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label className="mb-3 block">
                                        List any training you have attended, within the past year, related to serving persons with
                                        developmental disabilities
                                    </Label>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        (e.g., assisting with medications, First Aid, CPR, legal rights, ETC.) Give dates attended and be
                                        prepared to produce proof your file. Failure to provide required proof will result in having to
                                        repeat the class. Click the + sign at the end of the row to add additional lines.
                                    </p>
                                    <div className="space-y-4">
                                        {formData.training.map((training, index) => (
                                            <div key={index} className="grid md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg relative">
                                                {formData.training.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeTraining(index)}
                                                        className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <div>
                                                    <Label htmlFor={`training-date-${index}`}>Date</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`training-date-${index}`}
                                                        type="date"
                                                        value={training.date}
                                                        onChange={(e) => {
                                                            const newTraining = [...formData.training]
                                                            newTraining[index].date = e.target.value
                                                            handleInputChange("training", newTraining)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`training-class-${index}`}>Class</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`training-class-${index}`}
                                                        value={training.class}
                                                        onChange={(e) => {
                                                            const newTraining = [...formData.training]
                                                            newTraining[index].class = e.target.value
                                                            handleInputChange("training", newTraining)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`training-presenter-${index}`}>Presenter</Label>
                                                    <Input
                                                        className="mt-2 border border-primary/40"
                                                        id={`training-presenter-${index}`}
                                                        value={training.presenter}
                                                        onChange={(e) => {
                                                            const newTraining = [...formData.training]
                                                            newTraining[index].presenter = e.target.value
                                                            handleInputChange("training", newTraining)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={addTraining} className="w-full bg-transparent">
                                            + Add Another Training
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="signature">Signature/Disclaimer</Label>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        I certify that my answers are true and complete to the best of my knowledge. If this application
                                        leads to being a host home provider, I understand that false or misleading information in my
                                        application may result in my removal from the program.
                                    </p>
                                    <Input
                                        className="mt-2 border border-primary/40"
                                        id="signature"
                                        value={formData.signature}
                                        onChange={(e) => handleInputChange("signature", e.target.value)}
                                        placeholder="Type your full name as signature"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                            {/* <Button type="button" variant="outline" onClick={handleDownloadPDF} className="flex-1 bg-transparent">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button> */}
                            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
                                <Send className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Submitting..." : "Submit Application"}
                            </Button>
                        </div>

                        {/* Updated Disclaimer */}
                        <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                            <h3 className="text-lg font-semibold text-foreground mb-3">Submission Instructions:</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">
                                    When you click "Submit Application", your PDF will be downloaded and an email will attempt to open automatically.
                                </p>
                                <p>
                                    <strong>If your email client does not open:</strong>
                                </p>
                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                    <li>Locate the downloaded PDF file (usually in your Downloads folder)</li>
                                    <li>Compose a new email to: <strong className="text-primary">info@nissihomehealth.com</strong></li>
                                    <li>Attach the downloaded PDF to your email</li>
                                    <li>Add a brief message introducing yourself and send</li>
                                </ol>
                                <p className="mt-3">
                                    <strong>Contact:</strong> If you experience any issues, please call us at{" "}
                                    <strong className="text-primary">720-594-0593</strong> or{" "}
                                    <strong className="text-primary">678-267-9117</strong>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}