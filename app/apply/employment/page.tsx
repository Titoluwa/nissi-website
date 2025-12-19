"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Send, Trash2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ALL_COUNTRIES } from "@/lib/constant"

export default function EmploymentApplicationPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
        email: "",
        phone: "",
        mobilePhone: "",
        isUSCitizen: "",
        backgroundCheck: "",
        positionApplyingFor: "",
        availableStartDate: "",
        desiredPay: "",
        employmentDesired: "",
        availability: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        schools: [{ name: "", location: "", degree: "", major: "" }],
        previousEmployers: [{ employer: "", jobTitle: "", datesEmployed: "", startingPay: "", location: "", phone: "" }],
        references: [{ name: "", title: "", company: "", phone: "" }],
        whyWorkHere: "",
        signature: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = useCallback((field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }, [])

    const handleAvailabilityChange = useCallback((day: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            availability: { ...prev.availability, [day]: checked },
        }))
    }, [])

    const addSchool = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            schools: [...prev.schools, { name: "", location: "", degree: "", major: "" }],
        }))
    }, [])

    const removeSchool = useCallback((index: number) => {
        setFormData((prev) => ({
            ...prev,
            schools: prev.schools.filter((_, i) => i !== index),
        }))
    }, [])

    const addEmployer = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            previousEmployers: [
                ...prev.previousEmployers,
                { employer: "", jobTitle: "", datesEmployed: "", startingPay: "", location: "", phone: "" },
            ],
        }))
    }, [])

    const removeEmployer = useCallback((index: number) => {
        setFormData((prev) => ({
            ...prev,
            previousEmployers: prev.previousEmployers.filter((_, i) => i !== index),
        }))
    }, [])

    const addReference = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            references: [...prev.references, { name: "", title: "", company: "", phone: "" }],
        }))
    }, [])

    const removeReference = useCallback((index: number) => {
        setFormData((prev) => ({
            ...prev,
            references: prev.references.filter((_, i) => i !== index),
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
        doc.text("Employment Application", 105, yPosition, { align: "center" })
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
        doc.text("YOUR PERSONAL INFORMATION", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, yPosition)
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

        doc.text(`Country: ${formData.country}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Email: ${formData.email}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Phone: ${formData.phone}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Mobile: ${formData.mobilePhone}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`U.S. Citizen: ${formData.isUSCitizen}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Background Check: ${formData.backgroundCheck}`, 20, yPosition)
        yPosition += 10
        checkNewPage()

        // Desired Position
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("DESIRED POSITION", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Position: ${formData.positionApplyingFor}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Start Date: ${formData.availableStartDate}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Desired Pay: ${formData.desiredPay}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        doc.text(`Employment Type: ${formData.employmentDesired}`, 20, yPosition)
        yPosition += lineHeight
        checkNewPage()

        const availableDays = Object.entries(formData.availability)
            .filter(([_, checked]) => checked)
            .map(([day, _]) => day.charAt(0).toUpperCase() + day.slice(1))
            .join(", ")
        doc.text(`Available Days: ${availableDays || "None selected"}`, 20, yPosition)
        yPosition += 10
        checkNewPage()

        // Education
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("EDUCATION", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        formData.schools.forEach((school, index) => {
            if (school.name || school.location) {
                doc.text(`School ${index + 1}:`, 20, yPosition)
                yPosition += lineHeight
                checkNewPage()
                if (school.name) {
                    doc.text(`  Name: ${school.name}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (school.location) {
                    doc.text(`  Location: ${school.location}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (school.degree) {
                    doc.text(`  Degree: ${school.degree}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (school.major) {
                    doc.text(`  Major: ${school.major}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
            }
        })
        yPosition += 5

        // Previous Employment
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("PREVIOUS EMPLOYMENT", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        formData.previousEmployers.forEach((employer, index) => {
            if (employer.employer || employer.jobTitle) {
                checkNewPage()
                doc.text(`Employer ${index + 1}:`, 20, yPosition)
                yPosition += lineHeight
                checkNewPage()
                if (employer.employer) {
                    doc.text(`  Company: ${employer.employer}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (employer.jobTitle) {
                    doc.text(`  Job Title: ${employer.jobTitle}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (employer.datesEmployed) {
                    doc.text(`  Dates: ${employer.datesEmployed}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (employer.startingPay) {
                    doc.text(`  Pay: ${employer.startingPay}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (employer.location) {
                    doc.text(`  Location: ${employer.location}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (employer.phone) {
                    doc.text(`  Phone: ${employer.phone}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
            }
        })
        yPosition += 5

        // References
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("REFERENCES", 20, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        formData.references.forEach((ref, index) => {
            if (ref.name || ref.title) {
                checkNewPage()
                doc.text(`Reference ${index + 1}:`, 20, yPosition)
                yPosition += lineHeight
                checkNewPage()
                if (ref.name) {
                    doc.text(`  Name: ${ref.name}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (ref.title) {
                    doc.text(`  Title: ${ref.title}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (ref.company) {
                    doc.text(`  Company: ${ref.company}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
                if (ref.phone) {
                    doc.text(`  Phone: ${ref.phone}`, 25, yPosition)
                    yPosition += lineHeight
                    checkNewPage()
                }
            }
        })
        yPosition += 5

        // More About You
        if (formData.whyWorkHere) {
            checkNewPage()
            doc.setFontSize(14)
            doc.setFont("helvetica", "bold")
            doc.text("MORE ABOUT YOU", 20, yPosition)
            yPosition += 8

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            const splitText = doc.splitTextToSize(formData.whyWorkHere, 170)
            splitText.forEach((line: string) => {
                checkNewPage()
                doc.text(line, 20, yPosition)
                yPosition += lineHeight
            })
            yPosition += 5
        }

        // Signature
        if (formData.signature) {
            checkNewPage()
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
        doc.save(`${formData.lastName || "employment"}-application.pdf`)
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
            a.download = `${formData.lastName}-employment-application.pdf`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            // Prepare email content
            const emailSubject = encodeURIComponent("Employment Application - " + formData.firstName + " " + formData.lastName)
            const emailBody = encodeURIComponent(
                `Please find attached my employment application.\n\n` +
                `Name: ${formData.firstName} ${formData.lastName}\n` +
                `Email: ${formData.email}\n` +
                `Phone: ${formData.phone}\n` +
                `Position: ${formData.positionApplyingFor}\n\n` +
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
        <div className="min-h-screen bg-background bg-primary/40">
            <Header />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-card rounded-lg shadow-lg p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Employment Application</h1>
                        <p className="text-muted-foreground">
                            We are an Equal Opportunity Employer and we are committed to excellence through diversity.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Personal Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                                YOUR PERSONAL INFORMATION
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
                                        <Label htmlFor="state">State / Province / Region</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="state"
                                            value={formData.state}
                                            onChange={(e) => handleInputChange("state", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="zipCode"
                                            value={formData.zipCode}
                                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                                            <SelectTrigger className="mt-2 border border-primary/40 w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ALL_COUNTRIES.map((country) => (
                                                    <SelectItem key={country.value} value={country.label}>
                                                        {country.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="email">Your Email Address</Label>
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
                                        <Label htmlFor="phone">Your Phone</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="mobilePhone">Mobile Phone</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="mobilePhone"
                                            type="tel"
                                            value={formData.mobilePhone}
                                            onChange={(e) => handleInputChange("mobilePhone", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label className="mb-3 block">Are you a U.S. Citizen?</Label>
                                        <RadioGroup
                                            value={formData.isUSCitizen}
                                            onValueChange={(value) => handleInputChange("isUSCitizen", value)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem className="border border-primary/40" value="Yes" id="citizen-yes" />
                                                <Label htmlFor="citizen-yes" className="font-normal cursor-pointer">
                                                    Yes
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem className="border border-primary/40" value="No" id="citizen-no" />
                                                <Label htmlFor="citizen-no" className="font-normal cursor-pointer">
                                                    No
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        <Label className="mb-3 block">Willing to submit to a background check?</Label>
                                        <RadioGroup
                                            value={formData.backgroundCheck}
                                            onValueChange={(value) => handleInputChange("backgroundCheck", value)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem className="border border-primary/40" value="Yes" id="background-yes" />
                                                <Label htmlFor="background-yes" className="font-normal cursor-pointer">
                                                    Yes
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem className="border border-primary/40" value="No" id="background-no" />
                                                <Label htmlFor="background-no" className="font-normal cursor-pointer">
                                                    No
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Desired Position */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                                DESIRED POSITION
                            </h2>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="positionApplyingFor">Position Applying For</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="positionApplyingFor"
                                            value={formData.positionApplyingFor}
                                            onChange={(e) => handleInputChange("positionApplyingFor", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="availableStartDate">Available Start Date</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="availableStartDate"
                                            type="date"
                                            value={formData.availableStartDate}
                                            onChange={(e) => handleInputChange("availableStartDate", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="desiredPay">Desired Pay</Label>
                                        <Input
                                            className="mt-2 border border-primary/40"
                                            id="desiredPay"
                                            value={formData.desiredPay}
                                            onChange={(e) => handleInputChange("desiredPay", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="mb-3 block">Employment Desired</Label>
                                    <RadioGroup
                                        value={formData.employmentDesired}
                                        onValueChange={(value) => handleInputChange("employmentDesired", value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="Full-Time" id="full-time" />
                                            <Label htmlFor="full-time" className="font-normal cursor-pointer">
                                                Full-Time
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="border border-primary/40" value="Part-Time" id="part-time" />
                                            <Label htmlFor="part-time" className="font-normal cursor-pointer">
                                                Part-Time
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label className="mb-3 block">Hours You Are Available for Work</Label>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Please tell us what hours you are available to work each day of the week. Click the + sign at the
                                        end of the row to add additional times if needed.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                                            <div key={day} className="flex items-center space-x-2">
                                                <Checkbox
                                                    className="border border-primary/40"
                                                    id={day}
                                                    checked={formData.availability[day as keyof typeof formData.availability]}
                                                    onCheckedChange={(checked) => handleAvailabilityChange(day, checked as boolean)}
                                                />
                                                <Label htmlFor={day} className="font-normal cursor-pointer text-sm capitalize">
                                                    {day.slice(0, 3)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">EDUCATION</h2>

                            <p className="text-sm text-muted-foreground mb-4">
                                Please provide your education history. Click the + sign at the end of the row to add additional schools.
                            </p>

                            <div className="space-y-4">
                                {formData.schools.map((school, index) => (
                                    <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg relative">
                                        {formData.schools.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeSchool(index)}
                                                className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <div>
                                            <Label htmlFor={`school-name-${index}`}>School Name</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`school-name-${index}`}
                                                value={school.name}
                                                onChange={(e) => {
                                                    const newSchools = [...formData.schools]
                                                    newSchools[index].name = e.target.value
                                                    handleInputChange("schools", newSchools)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`school-location-${index}`}>Location</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`school-location-${index}`}
                                                value={school.location}
                                                onChange={(e) => {
                                                    const newSchools = [...formData.schools]
                                                    newSchools[index].location = e.target.value
                                                    handleInputChange("schools", newSchools)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`school-degree-${index}`}>Degree Received</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`school-degree-${index}`}
                                                value={school.degree}
                                                onChange={(e) => {
                                                    const newSchools = [...formData.schools]
                                                    newSchools[index].degree = e.target.value
                                                    handleInputChange("schools", newSchools)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`school-major-${index}`}>Major</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`school-major-${index}`}
                                                value={school.major}
                                                onChange={(e) => {
                                                    const newSchools = [...formData.schools]
                                                    newSchools[index].major = e.target.value
                                                    handleInputChange("schools", newSchools)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addSchool} className="w-full bg-transparent">
                                    + Add Another School
                                </Button>
                            </div>
                        </section>

                        {/* Previous Employment */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                                PREVIOUS EMPLOYMENT
                            </h2>

                            <p className="text-sm text-muted-foreground mb-4">
                                Please provide previous employment information. Click the + sign at the end of the row to add additional
                                references.
                            </p>

                            <div className="space-y-4">
                                {formData.previousEmployers.map((employer, index) => (
                                    <div key={index} className="grid md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg relative">
                                        {formData.previousEmployers.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeEmployer(index)}
                                                className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <div>
                                            <Label htmlFor={`employer-${index}`}>Employer</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`employer-${index}`}
                                                value={employer.employer}
                                                onChange={(e) => {
                                                    const newEmployers = [...formData.previousEmployers]
                                                    newEmployers[index].employer = e.target.value
                                                    handleInputChange("previousEmployers", newEmployers)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`job-title-${index}`}
                                                value={employer.jobTitle}
                                                onChange={(e) => {
                                                    const newEmployers = [...formData.previousEmployers]
                                                    newEmployers[index].jobTitle = e.target.value
                                                    handleInputChange("previousEmployers", newEmployers)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`dates-employed-${index}`}>Dates Employed</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`dates-employed-${index}`}
                                                value={employer.datesEmployed}
                                                onChange={(e) => {
                                                    const newEmployers = [...formData.previousEmployers]
                                                    newEmployers[index].datesEmployed = e.target.value
                                                    handleInputChange("previousEmployers", newEmployers)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`starting-pay-${index}`}>Starting & End Pay Rates</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`starting-pay-${index}`}
                                                value={employer.startingPay}
                                                onChange={(e) => {
                                                    const newEmployers = [...formData.previousEmployers]
                                                    newEmployers[index].startingPay = e.target.value
                                                    handleInputChange("previousEmployers", newEmployers)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`employer-location-${index}`}>Location</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`employer-location-${index}`}
                                                value={employer.location}
                                                onChange={(e) => {
                                                    const newEmployers = [...formData.previousEmployers]
                                                    newEmployers[index].location = e.target.value
                                                    handleInputChange("previousEmployers", newEmployers)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`employer-phone-${index}`}>Phone</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`employer-phone-${index}`}
                                                type="tel"
                                                value={employer.phone}
                                                onChange={(e) => {
                                                    const newEmployers = [...formData.previousEmployers]
                                                    newEmployers[index].phone = e.target.value
                                                    handleInputChange("previousEmployers", newEmployers)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addEmployer} className="w-full bg-transparent">
                                    + Add Another Employer
                                </Button>
                            </div>
                        </section>

                        {/* References */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">REFERENCES</h2>

                            <p className="text-sm text-muted-foreground mb-4">
                                Please submit at least 3 references. (professional reference preferred). Click the + sign at the end of
                                the row to add additional references.
                            </p>

                            <div className="space-y-4">
                                {formData.references.map((reference, index) => (
                                    <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg relative">
                                        {formData.references.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeReference(index)}
                                                className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <div>
                                            <Label htmlFor={`ref-name-${index}`}>Name</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`ref-name-${index}`}
                                                value={reference.name}
                                                onChange={(e) => {
                                                    const newRefs = [...formData.references]
                                                    newRefs[index].name = e.target.value
                                                    handleInputChange("references", newRefs)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`ref-title-${index}`}>Title</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`ref-title-${index}`}
                                                value={reference.title}
                                                onChange={(e) => {
                                                    const newRefs = [...formData.references]
                                                    newRefs[index].title = e.target.value
                                                    handleInputChange("references", newRefs)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`ref-company-${index}`}>Company</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`ref-company-${index}`}
                                                value={reference.company}
                                                onChange={(e) => {
                                                    const newRefs = [...formData.references]
                                                    newRefs[index].company = e.target.value
                                                    handleInputChange("references", newRefs)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`ref-phone-${index}`}>Phone</Label>
                                            <Input
                                                className="mt-2 border border-primary/40"
                                                id={`ref-phone-${index}`}
                                                type="tel"
                                                value={reference.phone}
                                                onChange={(e) => {
                                                    const newRefs = [...formData.references]
                                                    newRefs[index].phone = e.target.value
                                                    handleInputChange("references", newRefs)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addReference} className="w-full bg-transparent">
                                    + Add Another Reference
                                </Button>
                            </div>
                        </section>

                        {/* More About You */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">MORE ABOUT YOU</h2>

                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="whyWorkHere">Tell Us Why You Want to Work with Nissi Home?</Label>
                                    <Textarea
                                        id="whyWorkHere"
                                        value={formData.whyWorkHere}
                                        onChange={(e) => handleInputChange("whyWorkHere", e.target.value)}
                                        rows={6}
                                        placeholder="Please tell us more about yourself and why you would be the best candidate for this position."
                                        className="mt-2 border border-primary/40"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="signature">Signature/Disclaimer</Label>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        I certify that my answers are true and complete to the best of my knowledge. If this application
                                        leads to employment, I understand that false or misleading information in my application or
                                        interview may result in my release.
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
                                    <li>Compose a new email to: <strong className="text-primary">nissihomehealth@yahoo.com / nissihomehealth@gmail.com</strong></li>
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