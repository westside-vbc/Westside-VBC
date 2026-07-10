"use client"

import { useState, useEffect } from "react"
import { Trash2, Loader2, PackagePlus } from "lucide-react"
import { fetchEvents, createEvent, updateEvent, deleteEvent as deleteEventService } from "@/lib/services/adminService"
import toast from "react-hot-toast"

export default function EventsTab() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addingEvent, setAddingEvent] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: ""
  })
  const [eventImage, setEventImage] = useState<File | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchEvents()
      setEvents(data)
    } catch (error) {
      toast.error("Failed to load events")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast.error("Please fill all required fields.")
      return
    }
    
    setAddingEvent(true)
    try {
      if (editingEventId) {
        await updateEvent(editingEventId, newEvent, eventImage)
        toast.success("Event updated successfully!")
      } else {
        await createEvent(newEvent, eventImage)
        toast.success("Event created successfully!")
      }
      
      setNewEvent({ title: "", date: "", time: "", location: "", description: "", imageUrl: "" })
      setEventImage(null)
      setEditingEventId(null)
      loadData()
    } catch (error: any) {
      console.error("Error saving event:", error)
      toast.error(error.message || "Failed to save event")
    } finally {
      setAddingEvent(false)
    }
  }

  const cancelEdit = () => {
    setNewEvent({ title: "", date: "", time: "", location: "", description: "", imageUrl: "" })
    setEventImage(null)
    setEditingEventId(null)
  }

  const deleteEvent = async (eventId: string) => {
    if (!window.confirm("Delete this event?")) return
    try {
      await deleteEventService(eventId)
      setEvents(prev => prev.filter(e => e.id !== eventId))
      toast.success("Event deleted")
    } catch (error) {
      console.error("Error deleting event:", error)
      toast.error("Delete failed")
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-[#00274c] mb-8">Events Management</h2>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
        <h3 className="text-xl font-bold mb-6">{editingEventId ? "Edit Event" : "Create New Event"}</h3>
        <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Event Banner / Image {editingEventId && "(Leave blank to keep current image)"}</label>
            <input type="file" accept="image/*" onChange={e => setEventImage(e.target.files?.[0] || null)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
            <input required type="text" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" placeholder="e.g. Summer Tournament" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
            <input required type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
            <input required type="text" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" placeholder="e.g. 19.00 - 21.00" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
            <input required type="text" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" placeholder="e.g. SMA MDC" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea required value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" rows={3} placeholder="Event description..."></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end gap-4">
            {editingEventId && (
              <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-300 transition-colors">
                Cancel
              </button>
            )}
            <button type="submit" disabled={addingEvent} className="bg-[#00274c] text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-900 transition-colors flex items-center gap-2">
              {addingEvent ? <Loader2 className="animate-spin w-5 h-5" /> : <PackagePlus className="w-5 h-5" />}
              {addingEvent ? "Saving..." : editingEventId ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>

      <h3 className="text-2xl font-bold text-[#00274c] mb-6">Upcoming Events</h3>
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>
      ) : events.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">No events found. Add your first event!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative h-48 w-full bg-gray-100">
                {evt.imageUrl && <img src={evt.imageUrl} alt={evt.title} className="w-full h-full object-cover" />}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="font-bold text-lg mb-2 text-blue-600">{evt.title}</h4>
                <ul className="text-sm text-gray-600 space-y-1 mb-4 flex-grow">
                  <li><strong>Date:</strong> {evt.date}</li>
                  <li><strong>Time:</strong> {evt.time}</li>
                  <li><strong>Location:</strong> {evt.location}</li>
                </ul>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{evt.description}</p>
                <div className="mt-auto flex gap-2">
                  <button onClick={() => {
                    setNewEvent({
                      title: evt.title || "",
                      date: evt.date || "",
                      time: evt.time || "",
                      location: evt.location || "",
                      description: evt.description || "",
                      imageUrl: evt.imageUrl || ""
                    })
                    setEditingEventId(evt.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }} className="flex-1 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => deleteEvent(evt.id)} className="flex-1 py-2 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
