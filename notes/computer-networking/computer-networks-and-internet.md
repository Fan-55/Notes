# Computer Networks and the Internet

The **Internet** is a **computer network** that interconnects billions of computing devices throughout the world. These devices are called **hosts** or **end systems**.

End systems are connected by a network of **communication links** and **packet switches**.

- Types of communication link:
  - coaxial cable
  - copper wire
  - optical fiber
  - radio spectrum

Different communication links can transmit data at different rates. The **transmission rate** of a communication link is measured in bits/second.

Sending end system segments the data and add header bytes to each segment. The resulting packages of information known as packets are then sent through the network to the destination end system, where they are reassembled into the original data.

A packet switch takes a packet arriving on one of its incoming communication links and forwards that packet on one of its outgoing communication links.

- Types of packet switch:
  - router: used in **network core** (1.2.1)
  - link-layer switch: used in **access networks** (1.3)

The sequence of communication links and packet switches traversed by a packet from sending end system to destination/receiving end system is known as a **route** or **path** through the network.

End systems access the Internet through **Internet Service Providers (ISPs)**.

End systems, packet switches, and other pieces of the Internet run **protocols** that control the sending and receiving of information within the Internet.

A protocol defines the format and the order of messages exchanged between two
or more communicating entities, as well as the actions taken on the transmission
and/or receipt of a message or other event.


https://sp25.cs168.io/
