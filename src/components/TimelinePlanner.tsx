'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Calendar, CheckCircle2, Circle, Printer } from 'lucide-react';

interface TimelineTask {
  id: string;
  text: string;
  completed: boolean;
}

interface TimelineSection {
  title: string;
  weeks: number;
  tasks: TimelineTask[];
  expanded: boolean;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  moveDate: string;
  pickupAddress: string;
  destinationAddress: string;
  homeSize: string;
  notes: string;
}

export default function TimelinePlanner() {
  const [moveDate, setMoveDate] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [movingDistance, setMovingDistance] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);
  const [daysUntilMove, setDaysUntilMove] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    moveDate: '',
    pickupAddress: '',
    destinationAddress: '',
    homeSize: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [timeline, setTimeline] = useState<TimelineSection[]>([
    {
      title: '8 Weeks Before',
      weeks: 8,
      expanded: true,
      tasks: [
        { id: '8w-1', text: 'Create moving budget', completed: false },
        { id: '8w-2', text: 'Research moving companies', completed: false },
        { id: '8w-3', text: 'Start decluttering', completed: false },
        { id: '8w-4', text: 'Begin inventory list', completed: false }
      ]
    },
    {
      title: '6 Weeks Before',
      weeks: 6,
      expanded: true,
      tasks: [
        { id: '6w-1', text: 'Book professional movers', completed: false },
        { id: '6w-2', text: 'Start gathering packing supplies', completed: false },
        { id: '6w-3', text: 'Notify landlord/real estate agent', completed: false },
        { id: '6w-4', text: 'Research new area', completed: false }
      ]
    },
    {
      title: '4 Weeks Before',
      weeks: 4,
      expanded: true,
      tasks: [
        { id: '4w-1', text: 'Order packing supplies', completed: false },
        { id: '4w-2', text: 'Start packing non-essentials', completed: false },
        { id: '4w-3', text: 'Change address with USPS', completed: false },
        { id: '4w-4', text: 'Transfer utilities', completed: false }
      ]
    },
    {
      title: '2 Weeks Before',
      weeks: 2,
      expanded: true,
      tasks: [
        { id: '2w-1', text: 'Confirm moving company details', completed: false },
        { id: '2w-2', text: 'Pack most belongings', completed: false },
        { id: '2w-3', text: 'Clean out storage areas', completed: false },
        { id: '2w-4', text: 'Arrange childcare/pet care for moving day', completed: false }
      ]
    },
    {
      title: '1 Week Before',
      weeks: 1,
      expanded: true,
      tasks: [
        { id: '1w-1', text: 'Pack essentials box', completed: false },
        { id: '1w-2', text: 'Defrost freezer', completed: false },
        { id: '1w-3', text: 'Confirm parking for moving truck', completed: false },
        { id: '1w-4', text: 'Do final walkthrough', completed: false }
      ]
    },
    {
      title: 'Moving Day',
      weeks: 0,
      expanded: true,
      tasks: [
        { id: 'md-1', text: 'Meet movers', completed: false },
        { id: 'md-2', text: 'Do final walkthrough', completed: false },
        { id: 'md-3', text: 'Keep important documents with you', completed: false },
        { id: 'md-4', text: 'Check inventory', completed: false }
      ]
    }
  ]);

  useEffect(() => {
    if (moveDate) {
      const today = new Date();
      const move = new Date(moveDate);
      const diffTime = move.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilMove(diffDays);
    }
  }, [moveDate]);

  useEffect(() => {
    // Load saved progress from localStorage
    const saved = localStorage.getItem('moving-timeline-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeline(parsed);
      } catch (e) {
        console.error('Failed to load saved progress');
      }
    }
  }, []);

  const handleGenerate = () => {
    if (moveDate && homeSize && movingDistance) {
      setShowTimeline(true);
      setFormData(prev => ({ ...prev, moveDate, homeSize }));
    }
  };

  const toggleSection = (index: number) => {
    setTimeline(prev => {
      const newTimeline = [...prev];
      newTimeline[index].expanded = !newTimeline[index].expanded;
      return newTimeline;
    });
  };

  const toggleTask = (sectionIndex: number, taskId: string) => {
    setTimeline(prev => {
      const newTimeline = [...prev];
      const task = newTimeline[sectionIndex].tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
      // Save to localStorage
      localStorage.setItem('moving-timeline-progress', JSON.stringify(newTimeline));
      return newTimeline;
    });
  };

  const getTotalProgress = () => {
    const totalTasks = timeline.reduce((acc, section) => acc + section.tasks.length, 0);
    const completedTasks = timeline.reduce(
      (acc, section) => acc + section.tasks.filter(t => t.completed).length,
      0
    );
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const getSectionProgress = (section: TimelineSection) => {
    const completed = section.tasks.filter(t => t.completed).length;
    return Math.round((completed / section.tasks.length) * 100);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xwvrvwzn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('Thank you! We will contact you soon.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          moveDate: '',
          pickupAddress: '',
          destinationAddress: '',
          homeSize: '',
          notes: ''
        });
      } else {
        setSubmitMessage('Something went wrong. Please try calling us instead.');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try calling us instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Plan Your Move
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="moveDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Move Date
            </label>
            <input
              type="date"
              id="moveDate"
              value={moveDate}
              onChange={(e) => setMoveDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="homeSize" className="block text-sm font-semibold text-gray-700 mb-2">
              Home Size
            </label>
            <select
              id="homeSize"
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            >
              <option value="">Select size</option>
              <option value="studio">Studio</option>
              <option value="1br">1 Bedroom</option>
              <option value="2br">2 Bedroom</option>
              <option value="3br">3 Bedroom</option>
              <option value="4br">4+ Bedroom</option>
              <option value="house">House</option>
            </select>
          </div>

          <div>
            <label htmlFor="movingDistance" className="block text-sm font-semibold text-gray-700 mb-2">
              Moving Distance
            </label>
            <select
              id="movingDistance"
              value={movingDistance}
              onChange={(e) => setMovingDistance(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            >
              <option value="">Select distance</option>
              <option value="local">Local (&lt;50 miles)</option>
              <option value="long">Long Distance (50-200 miles)</option>
              <option value="cross">Cross Country (&gt;200 miles)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!moveDate || !homeSize || !movingDistance}
          className="mt-6 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Generate My Timeline
        </button>
      </div>

      {/* Timeline Display */}
      {showTimeline && (
        <>
          {/* Progress Summary */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 mb-8 text-white print:hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Your Moving Timeline</h3>
                {daysUntilMove !== null && (
                  <p className="text-lg opacity-90">
                    {daysUntilMove > 0
                      ? `${daysUntilMove} days until your move`
                      : daysUntilMove === 0
                      ? 'Moving day is today!'
                      : 'Your move date has passed'}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold">{getTotalProgress()}%</div>
                  <div className="text-sm opacity-90">Complete</div>
                </div>
                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  Print
                </button>
              </div>
            </div>
            <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500 rounded-full"
                style={{ width: `${getTotalProgress()}%` }}
              />
            </div>
          </div>

          {/* Timeline Sections */}
          <div className="space-y-4 mb-8">
            {timeline.map((section, sectionIndex) => {
              const progress = getSectionProgress(section);
              const isComplete = progress === 100;

              return (
                <div
                  key={section.title}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                    isComplete ? 'border-2 border-green-500' : 'border-2 border-transparent'
                  }`}
                >
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{progress}%</span>
                        </div>
                      </div>
                    </div>
                    {section.expanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  {section.expanded && (
                    <div className="px-6 pb-6">
                      <div className="space-y-3 ml-10">
                        {section.tasks.map((task) => (
                          <label
                            key={task.id}
                            className="flex items-start gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(sectionIndex, task.id)}
                              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                            />
                            <span
                              className={`text-gray-700 group-hover:text-purple-600 transition-colors ${
                                task.completed ? 'line-through text-gray-400' : ''
                              }`}
                            >
                              {task.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Book Your Move?</h2>
          <p className="text-xl md:text-2xl opacity-90 mb-6">
            Let SwiftLift Moving handle the heavy lifting while you focus on the exciting parts of your move.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="text-3xl font-bold">Call or Text: (682) 288-4710</div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="tel:6822884710"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Call Now
            </a>
            <a
              href="#quote-form"
              className="px-8 py-4 bg-purple-800 text-white rounded-lg font-bold text-lg hover:bg-purple-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Free Quote
            </a>
          </div>
        </div>

        {/* Booking Form */}
        <div id="quote-form" className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 mt-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Request a Free Quote</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white placeholder-white placeholder-opacity-60"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white placeholder-white placeholder-opacity-60"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white placeholder-white placeholder-opacity-60"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="formMoveDate" className="block text-sm font-semibold mb-2">
                  Preferred Move Date *
                </label>
                <input
                  type="date"
                  id="formMoveDate"
                  name="moveDate"
                  value={formData.moveDate}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pickupAddress" className="block text-sm font-semibold mb-2">
                Pickup Address *
              </label>
              <input
                type="text"
                id="pickupAddress"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white placeholder-white placeholder-opacity-60"
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>

            <div>
              <label htmlFor="destinationAddress" className="block text-sm font-semibold mb-2">
                Destination Address *
              </label>
              <input
                type="text"
                id="destinationAddress"
                name="destinationAddress"
                value={formData.destinationAddress}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white placeholder-white placeholder-opacity-60"
                placeholder="456 Oak Ave, City, State, ZIP"
              />
            </div>

            <div>
              <label htmlFor="formHomeSize" className="block text-sm font-semibold mb-2">
                Home Size *
              </label>
              <select
                id="formHomeSize"
                name="homeSize"
                value={formData.homeSize}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white"
              >
                <option value="" className="text-gray-800">Select size</option>
                <option value="studio" className="text-gray-800">Studio</option>
                <option value="1br" className="text-gray-800">1 Bedroom</option>
                <option value="2br" className="text-gray-800">2 Bedroom</option>
                <option value="3br" className="text-gray-800">3 Bedroom</option>
                <option value="4br" className="text-gray-800">4+ Bedroom</option>
                <option value="house" className="text-gray-800">House</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                rows={4}
                className="w-full px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg focus:border-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-30 outline-none transition-all text-white placeholder-white placeholder-opacity-60 resize-none"
                placeholder="Any special requirements or questions?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isSubmitting ? 'Sending...' : 'Request Free Quote'}
            </button>

            {submitMessage && (
              <div className={`text-center p-4 rounded-lg ${
                submitMessage.includes('Thank you') ? 'bg-green-500' : 'bg-red-500'
              } bg-opacity-20 border-2 ${
                submitMessage.includes('Thank you') ? 'border-green-300' : 'border-red-300'
              }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
