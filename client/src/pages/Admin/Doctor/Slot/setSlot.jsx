import axios from '../../../../utils/axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, DatePicker, TimePicker, List, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const SetSlot = () => {
  const [date, setDate] = useState(null);
  const [starttime, setStartTime] = useState(null);
  const [endtime, setEndTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  const Navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('DOCTOR_ID');
    if (id) {
      setDoctorId(id);
    } else {
      message.error('Doctor ID not found. Please log in again.');
      Navigate('/doctor/login');
    }
  }, []);

  const handleAddSlot = () => {
    if (starttime && endtime) {
      const newSlot = {
        starttime: starttime.format('HH:mm'),
        endtime: endtime.format('HH:mm'),
      };

      const hasConflict = timeSlots.some(
        slot =>
          (newSlot.starttime >= slot.starttime &&
            newSlot.starttime < slot.endtime) ||
          (newSlot.endtime > slot.starttime &&
            newSlot.endtime <= slot.endtime) ||
          (newSlot.starttime <= slot.starttime &&
            newSlot.endtime >= slot.endtime)
      );

      if (hasConflict) {
        message.warning('This slot overlaps with an existing slot.');
        return;
      }

      setTimeSlots([...timeSlots, newSlot]);
      setStartTime(null);
      setEndTime(null);
    } else {
      message.warning('Please select both start and end times.');
    }
  };

  const handleSubmit = async () => {
    if (!doctorId) {
      message.error('Unable to identify doctor. Please log in.');
      return;
    }

    if (!date) {
      message.error('Please select a date.');
      return;
    }

    const formattedDate = date.format('YYYY-MM-DD');
    const finalSlot = {
      id: doctorId,
      slot: {
        date: formattedDate,
        slotDetails: timeSlots,
      },
    };
    console.log('yjytjyt', finalSlot);

    try {
      await axios.post('/doctor/add-slot', finalSlot);
      console.log(finalSlot);

      message.success('Slot added successfully');
      setDate(null);
      setTimeSlots([]);
    } catch (error) {
      console.error('Error adding slot:', error);
      message.error('Failed to add slot.');
    }
  };

  return (
    <div
      className="wrapper"
      style={{ maxWidth: 700, margin: '0 auto', padding: '20px' }}
    >
      <div className="heading" style={{ marginRight: '40px' }}>
        <h1 style={{ color: 'black' }}>Select your date and time slots</h1>
      </div>
      <Form layout="horizontal" onFinish={handleSubmit}>
        <Form.Item label="Select Date" required>
          <DatePicker
            value={date}
            onChange={setDate}
            style={{ width: '100%' }}
          />
        </Form.Item>

        {date && (
          <>
            <Form.Item label="Start Time" required>
              <TimePicker
                value={starttime}
                onChange={setStartTime}
                format="HH:mm"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item label="End Time" required>
              <TimePicker
                value={endtime}
                onChange={setEndTime}
                format="HH:mm"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Button type="dashed" onClick={handleAddSlot} block>
              Add Slot
            </Button>

            <List
              style={{ marginTop: '20px' }}
              header={<b>Added Slots</b>}
              bordered
              dataSource={timeSlots}
              renderItem={(item, index) => (
                <List.Item>
                  {item.starttime} - {item.endtime}
                </List.Item>
              )}
            />
          </>
        )}

        {timeSlots.length > 0 && (
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Slots
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default SetSlot;
